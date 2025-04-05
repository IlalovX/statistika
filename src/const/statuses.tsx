export const statusDetails: Record<
	string,
	{ color: string; icon: React.ReactNode }
> = {
	Истиқболсиз: {
		color: '#ff9800',
		icon: <img src='/svg/projects/Background.svg' />,
	}, // Оранжевый
	Бошланмаган: {
		color: '#2196f3',
		icon: <img src='/svg/projects/Background (1).svg' />,
	}, // Синий
	'Ишга туширилган': {
		color: '#4caf50',
		icon: <img src='/svg/projects/Background (2).svg' />,
	}, // Зеленый
	Кечикмоқда: {
		color: '#f44336',
		icon: <img src='/svg/projects/Background (3).svg' />,
	}, // Красный
	Тугатилган: {
		color: '#616161',
		icon: <img src='/svg/projects/Background (4).svg' />,
	}, // Серый
	'Рад этилган': {
		color: '#f44336',
		icon: <img src='/svg/projects/Background (4).svg' />,
	}, // Красный
	'Амалга оширилмоқда': {
		color: '#4caf50',
		icon: <img src='/svg/projects/Background (4).svg' />,
	}, // Зеленый
}
