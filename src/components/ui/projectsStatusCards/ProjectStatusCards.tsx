import {
	Business,
	CheckCircle,
	Error,
	HourglassEmpty,
	PlayArrow,
} from '@mui/icons-material'
import { Box, Typography, useTheme } from '@mui/material'
import { Data } from '../../../pages/projects/Projects'

function ProjectStatusCards({ data }: { data: Data }) {
	const statusDetails: Record<
		string,
		{ color: string; icon: React.ReactNode }
	> = {
		Истиқболсиз: { color: '#ff9800', icon: <HourglassEmpty /> }, // Оранжевый
		Бошланмаган: { color: '#2196f3', icon: <PlayArrow /> }, // Синий
		'Ишга туширилган': { color: '#4caf50', icon: <CheckCircle /> }, // Зеленый
		Кечикмоқда: { color: '#f44336', icon: <Error /> }, // Красный
		Тугатилган: { color: '#616161', icon: <CheckCircle /> }, // Серый
		'Рад этилган': { color: '#f44336', icon: <Error /> }, // Красный
		'Амалга оширилмоқда': { color: '#4caf50', icon: <Business /> }, // Зеленый
	}

	const statusCounts = (
		Object.entries(
			data?.Projects?.reduce(
				(acc, project) => {
					const status = data?.Statuses?.find(
						status => status.id === project.status_id
					)
					if (!status) return acc

					if (!acc[status.name]) {
						acc[status.name] = {
							name: status.name,
							count: 0,
							color: statusDetails[status.name]?.color || '#000',
							icon: statusDetails[status.name]?.icon || null,
						}
					}

					acc[status.name].count += 1
					return acc
				},
				{} as Record<
					string,
					{ name: string; count: number; color: string; icon: React.ReactNode }
				>
			) || {}
		)?.map(([_, value]) => value) || []
	).concat([
		{
			name: 'Рад этилган',
			count: 0,
			color: statusDetails['Рад этилган']?.color || '#000',
			icon: statusDetails['Рад этилган']?.icon || null,
		},
	])

	const theme = useTheme()
	return (
		<div className='grid grid-cols-6 gap-5 mt-4'>
			{statusCounts.map((item, index) => (
				<Box
					key={index}
					className=' shadow-md rounded-xl p-2 space-y-2'
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
