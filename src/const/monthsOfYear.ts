export const monthsOfYear = [
	'Янв',
	'Фев',
	'Мар',
	'Апр',
	'Май',
	'Июн',
	'Июл',
	'Авг',
	'Сен',
	'Окт',
	'Ноя',
	'Дек',
]

export const MONTHS = [
	{ value: 1, label: 'Январь' },
	{ value: 2, label: 'Февраль' },
	{ value: 3, label: 'Март' },
	{ value: 4, label: 'Апрель' },
	{ value: 5, label: 'Май' },
	{ value: 6, label: 'Июнь' },
	{ value: 7, label: 'Июль' },
	{ value: 8, label: 'Август' },
	{ value: 9, label: 'Сентябрь' },
	{ value: 10, label: 'Октябрь' },
	{ value: 11, label: 'Ноябрь' },
	{ value: 12, label: 'Декабрь' },
]

export const currentYear = new Date().getFullYear()
export const currentMonth = MONTHS[new Date().getMonth()]
