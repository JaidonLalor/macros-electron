package main

import "github.com/charmbracelet/lipgloss"

var (
	amber = lipgloss.Color("#FFBF00")
	black = lipgloss.Color("#000000")

	listStyle = lipgloss.NewStyle().
			Foreground(amber).
			Background(black)

	selectedStyle = lipgloss.NewStyle().
			Foreground(black).
			Background(amber)

	panelStyle = lipgloss.NewStyle().
			BorderStyle(lipgloss.NormalBorder()).
			BorderForeground(amber)

	focusedStyle = lipgloss.NewStyle().
			Border(lipgloss.NormalBorder()).
			BorderForeground(lipgloss.Color("205"))
)
