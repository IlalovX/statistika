import { Box, Typography, useTheme } from '@mui/material'
import { ProjectsStatusesForm } from '../../types/projects-statuses.interface'
import { GetProjects } from '../../types/projects.interface'

function ProjectStatusCards({
	projects,
	statuses,
}: {
	projects: GetProjects[]
	statuses: ProjectsStatusesForm[]
}) {
	const defaultStatus = 'Амалга оширилмоқда'

	const statusDetails: Record<
		string,
		{ color: string; icon: React.ReactNode }
	> = {
		Истиқболсиз: {
			color: '#ff9800',
			icon: <img src='/svg/projects/Background.svg' />,
		},
		Бошланмаган: {
			color: '#2196f3',
			icon: <img src='/svg/projects/Background (2).svg' />,
		},
		'Ишга туширилган': {
			color: '#4caf50',
			icon: <img src='/svg/projects/Background (2).svg' />,
		},
		Кечикмоқда: {
			color: '#f44336',
			icon: <img src='/svg/projects/Background (3).svg' />,
		},
		Тугатилган: {
			color: '#616161',
			icon: <img src='/svg/projects/Background (4).svg' />,
		},
		'Рад этилган': {
			color: '#f44336',
			icon: <img src='/svg/projects/Background (4).svg' />,
		},
		'Амалга оширилмоқда': {
			color: '#4caf50',
			icon: <img src='/svg/projects/Background (1).svg' />,
		},
	}

	// Подсчёт по названию статуса
	const projectStatusCounts = projects.reduce(
		(acc, project) => {
			const key = project.project_status
			acc[key] = (acc[key] || 0) + 1
			return acc
		},
		{} as Record<string, number>
	)

	const theme = useTheme()

	const statusCounts = statuses.map(status => {
		const name = status.value
		const count = projectStatusCounts[name] || 0

		const details = statusDetails[name] || statusDetails[defaultStatus]

		return {
			name,
			count,
			color: details.color,
			icon: details.icon,
		}
	})

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
