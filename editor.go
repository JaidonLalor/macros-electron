package main

import (
	"strings"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type editor struct {
	content  []string
	cursorX  int
	cursorY  int
	width    int
	height   int
	focussed bool
}

func initialEditor() editor {
	return editor{
		content:  []string{"Welcome to the text editor!", "You can type here."},
		focussed: false,
	}
}

func (e editor) Update(msg tea.Msg) (editor, tea.Cmd) {
	if !e.focussed {
		return e, nil
	}

	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.Type {
		case tea.KeyBackspace:
			if e.cursorX > 0 {
				// Remove character before cursor
				line := e.content[e.cursorY]
				e.content[e.cursorY] = line[:e.cursorX-1] + line[e.cursorX:]
				e.cursorX--
			} else if e.cursorY > 0 {
				// Merge with previous line
				e.cursorY--
				e.cursorX = len(e.content[e.cursorY])
				e.content[e.cursorY] += e.content[e.cursorY+1]
				e.content = append(e.content[:e.cursorY+1], e.content[e.cursorY+2:]...)
			}
		case tea.KeyEnter:
			// Split line
			line := e.content[e.cursorY]
			e.content = append(e.content[:e.cursorY+1], e.content[e.cursorY:]...)
			e.content[e.cursorY] = line[:e.cursorX]
			e.content[e.cursorY+1] = line[e.cursorX:]
			e.cursorY++
			e.cursorX = 0
		case tea.KeyLeft:
			if e.cursorX > 0 {
				e.cursorX--
			}
		case tea.KeyRight:
			if e.cursorX < len(e.content[e.cursorY]) {
				e.cursorX++
			}
		case tea.KeyUp:
			if e.cursorY > 0 {
				e.cursorY--
				if e.cursorX > len(e.content[e.cursorY]) {
					e.cursorX = len(e.content[e.cursorY])
				}
			}
		case tea.KeyDown:
			if e.cursorY < len(e.content)-1 {
				e.cursorY++
				if e.cursorX > len(e.content[e.cursorY]) {
					e.cursorX = len(e.content[e.cursorY])
				}
			}
		default:
			// Handle regular character input
			if len(msg.String()) == 1 {
				// Insert character
				line := e.content[e.cursorY]
				e.content[e.cursorY] = line[:e.cursorX] + msg.String() + line[e.cursorX:]
				e.cursorX++
			}
		}
	}

	return e, nil
}

func (e editor) View() string {
	var sb strings.Builder

	for i, line := range e.content {
		if i == e.cursorY && e.focussed {
			// Render the line with the cursor
			before := line[:e.cursorX]
			after := line[e.cursorX:]
			cursor := "█"
			sb.WriteString(listStyle.Render(before + cursor + after))
		} else {
			sb.WriteString(listStyle.Render(line))
		}
		if i < len(e.content)-1 {
			sb.WriteString("\n")
		}
	}

	// Fill remaining space
	for i := len(e.content); i < e.height; i++ {
		sb.WriteString("\n" + listStyle.Render(strings.Repeat(" ", e.width)))
	}

	return lipgloss.NewStyle().Width(e.width).Height(e.height).Render(sb.String())
}

func (e *editor) Focus() {
	e.focussed = true
}

func (e *editor) Blur() {
	e.focussed = false
}

func (e *editor) Focused() bool {
	return e.focussed
}

func (e *editor) SetSize(width, height int) {
	e.width = width
	e.height = height
}