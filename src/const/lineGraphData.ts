export const dataset = [
	{ date: new Date(2024, 1, 1), value: 100 },
	{ date: new Date(2024, 1, 4), value: 200 },
	{ date: new Date(2024, 1, 9), value: 150 },
	{ date: new Date(2024, 1, 11), value: 250 },
	{ date: new Date(2024, 1, 15), value: 150 },
	{ date: new Date(2024, 1, 22), value: 200 },
	{ date: new Date(2024, 1, 24), value: 220 },
	{ date: new Date(2024, 1, 29), value: 280 },
	{ date: new Date(2024, 1, 31), value: 240 },
]


export const valueFormatter = (value: Date | null): string => {
	if (!value) return 'N/A'
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'short',
	}).format(value)
}