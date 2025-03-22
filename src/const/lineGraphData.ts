export const dataset = [
	{ date: new Date(2020, 1, 1), value: 100 },
	{ date: new Date(2020, 2, 15), value: 150 },
	{ date: new Date(2021, 1, 20), value: 80 },
	{ date: new Date(2021, 11, 39), value: 180 },
	{ date: new Date(2022, 1, 31), value: 200 },
	{ date: new Date(2022, 4, 25), value: 220 },
	{ date: new Date(2023, 5, 26), value: 250 },
	{ date: new Date(2024, 3, 12), value: 280 },
	{ date: new Date(2025, 6, 11), value: 300 },
]

export const valueFormatter = (value: Date | null): string => {
	if (!value) return 'N/A'
	return new Intl.DateTimeFormat('ru-RU', {
		year: 'numeric',
	}).format(value)
}
