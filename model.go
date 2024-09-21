package main

import (
	// "fmt"
	tea "github.com/charmbracelet/bubbletea"
)

type model struct {
	fileNav fileNav
	editor  editor
	width   int
	height  int
	focus   focus
}

type focus int

const (
	focusFileNav focus = iota
	focusEditor
)

func initialModel() model {
	return model{
		fileNav: initialFileNav(),
		editor:  initialEditor(),
		focus:   focusFileNav,
	}
}

func (m model) Init() tea.Cmd {
	return tea.EnterAltScreen
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c":
			return m, tea.Quit
		case "tab":
			// Switch focus
			if m.focus == focusFileNav {
				m.focus = focusEditor
				m.editor.Focus()
				m.fileNav.Blur()
			} else {
				m.focus = focusFileNav
				m.fileNav.Focus()
				m.editor.Blur()
			}
			return m, nil
		}
	case tea.WindowSizeMsg:
		m.width = msg.Width
		m.height = msg.Height
		m.editor.SetSize(m.width*2/3-2, m.height-2)
	}

	var cmd tea.Cmd
	if m.focus == focusFileNav {
		m.fileNav, cmd = m.fileNav.Update(msg)
	} else {
		m.editor, cmd = m.editor.Update(msg)
	}
	return m, cmd
}
