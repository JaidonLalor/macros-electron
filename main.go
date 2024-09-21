package main

import (
	"fmt"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

func main() {
	p := tea.NewProgram(initialModel(), tea.WithAltScreen())
	if _, err := p.Run(); err != nil {
		fmt.Printf("There was an error: %v", err)
	}
}

func (m model) View() string {
	// Calculate panel dimensions
	listWidth := m.width/3 - 2
	editorWidth := m.width*2/3 - 2

	// Render components
	fileNav := m.fileNav.View(listWidth, m.height-2)
	editor := m.editor.View()

	// Combine panels
	leftPanel := panelStyle.Width(listWidth).Render(fileNav)
	rightPanel := panelStyle.Width(editorWidth).Render(editor)

	// Add focus indicators
	if m.focus == focusFileNav {
		leftPanel = focusedStyle.Render(leftPanel)
	} else {
		rightPanel = focusedStyle.Render(rightPanel)
	}

	return lipgloss.JoinHorizontal(lipgloss.Top, leftPanel, rightPanel)
}