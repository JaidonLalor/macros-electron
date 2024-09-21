package main

import (
	"fmt"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type fileNav struct {
	files    []string
	cursor   int
	selected string
}

func initialFileNav() fileNav {
	return fileNav{
		files: []string{"file1.txt", "file2.txt", "file3.txt", "file4.txt", "file5.txt"},
	}
}

func (fn *fileNav) Focus() {
	// You might want to add some visual indication of focus
}

func (fn *fileNav) Blur() {
	// You might want to remove the visual indication of focus
}

func (fn fileNav) Update(msg tea.Msg) (fileNav, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "up":
			if fn.cursor > 0 {
				fn.cursor--
			}
		case "down":
			if fn.cursor < len(fn.files)-1 {
				fn.cursor++
			}
		case "enter":
			fn.selected = fn.files[fn.cursor]
		}
	}
	return fn, nil
}

func (fn fileNav) View(width, height int) string {
	s := ""
	for i, file := range fn.files {
		if i == fn.cursor {
			s += selectedStyle.Render(fmt.Sprintf("%-*s", width, file))
		} else {
			s += listStyle.Render(fmt.Sprintf("%-*s", width, file))
		}
		s += "\n"
	}
	return lipgloss.NewStyle().Height(height).Render(s)
}