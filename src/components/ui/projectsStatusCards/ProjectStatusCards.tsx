import {
	Business,
	CheckCircle,
	Error,
	HourglassEmpty,
	PlayArrow,
} from '@mui/icons-material'
import { Box, Typography, useTheme } from '@mui/material'
import { ProjectSuccessType, StatusesSuccessType } from '../../../types/queries'

function ProjectStatusCards({
	projects,
	statuses,
}: {
	projects: ProjectSuccessType[]
	statuses: StatusesSuccessType[]
}) {
	const statusDetails: Record<
		string,
		{ color: string; icon: React.ReactNode }
	> = {
		Истиқболсиз: { color: '#ff9800', icon: <HourglassEmpty /> },
		Бошланмаган: { color: '#2196f3', icon: <PlayArrow /> },
		'Ишга туширилган': { color: '#4caf50', icon: <CheckCircle /> },
		Кечикмоқда: { color: '#f44336', icon: <Error /> },
		Тугатилган: { color: '#616161', icon: <CheckCircle /> },
		'Рад этилган': { color: '#f44336', icon: <Error /> },
		'Амалга оширилмоқда': { color: '#4caf50', icon: <Business /> },
	}

	// Создаем мапу: статус ID => количество проектов
	const projectStatusCounts = projects.reduce(
		(acc, project) => {
			acc[project.status_id] = (acc[project.status_id] || 0) + 1
			return acc
		},
		{} as Record<number, number>
	)

	// Строим финальный массив карточек статуса
	const statusCounts = statuses.map(status => {
		const name = status.name
		const count = projectStatusCounts[status.id] || 0

		return {
			name,
			count,
			color: statusDetails[name]?.color || '#000',
			icon: statusDetails[name]?.icon || null,
		}
	})

	// // Если среди статусов нет "Рад этилган", добавим его вручную
	// if (!statusCounts.find(item => item.name === 'Рад этилган')) {
	// 	statusCounts.push({
	// 		name: 'Рад этилган',
	// 		count: 0,
	// 		color: statusDetails['Рад этилган'].color,
	// 		icon: statusDetails['Рад этилган'].icon,
	// 	})
	// }

	const theme = useTheme()

	return (
		<div className='grid grid-cols-6 gap-5 mt-4'>
			{statusCounts.map((item, index) => (
				<Box
					key={index}
					className='shadow-md rounded-xl p-2 space-y-2'
					sx={{
						backgroundColor: 'background.paper',
						border: `1px solid ${theme.palette.divider}`,
					}}
				>
					<div className='flex items-center gap-2'>
						{item.icon}
						<Typography variant='h6' className='text-2xl font-semibold'>
							{item.count}
						</Typography>
					</div>
					<Typography
						variant='h6'
						sx={{ color: item.color, fontWeight: 'bold' }}
					>
						{item.name}
					</Typography>
				</Box>
			))}
		</div>
	)
}

export default ProjectStatusCards
