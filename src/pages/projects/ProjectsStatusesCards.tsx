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

	const statusDetails: Record<string, { icon: React.ReactNode }> = {
		Истиқболсиз: {
			icon: <img src='/svg/projects/Background.svg' />,
		},
		Бошланмаган: {
			icon: <img src='/svg/projects/Background (2).svg' />,
		},
		'Ишга туширилган': {
			icon: <img src='/svg/projects/Background (2).svg' />,
		},
		Кечикмоқда: {
			icon: <img src='/svg/projects/Background (3).svg' />,
		},
		Тугатилган: {
			icon: <img src='/svg/projects/Background (4).svg' />,
		},
		'Рад этилган': {
			icon: <img src='/svg/projects/Background (4).svg' />,
		},
		'Амалга оширилмоқда': {
			icon: <img src='/svg/projects/Background (1).svg' />,
		},
	}

	// Подсчёт по названию статуса
	const projectStatusCounts = projects.reduce(
		(acc, project) => {
			const key = project.project_status.value
			acc[key] = (acc[key] || 0) + 1
			return acc
		},
		{} as Record<string, number>
	)

	const theme = useTheme()

	const statusCounts = statuses.map((status) => {
		const name = status.name ? status.name : status.value
		const count = projectStatusCounts[name] || 0

		const details = statusDetails[name] || statusDetails[defaultStatus]

		return {
			name,
			count,
			color: status.color,
			icon: details.icon,
		}
	})

	return (
		<div className='grid grid-cols-6 gap-5 mt-4'>
			{statusCounts.map((item, index) => (
				<Box
					key={index}
					className='shadow-md rounded-xl p-2 space-y-2 w-[180px]'
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
						variant='body2'
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
