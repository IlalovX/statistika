import {
	Business,
	CheckCircle,
	Error,
	HourglassEmpty,
	PlayArrow,
} from '@mui/icons-material'
import { Box, Typography, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ThemeText from '../../components/ThemeText'
import ProjectsTable from '../../components/ui/projectsTable/ProjectsTable'
interface Project {
	id: number
	region_id: number
	initiator: string
	name: string
	budget_million: number
	jobs_created: number
	completion_date: string
	authority_id: number
	status_id: number
	general_status: string
}

interface Region {
	id: number
	name: string
}

interface Authority {
	id: number
	name: string
}

interface Status {
	id: number
	name: string
}

interface Data {
	Regions: Region[]
	Authorities: Authority[]
	Statuses: Status[]
	Projects: Project[]
}

function Projects() {
	const theme = useTheme()
	const { data } = useQuery<Data>({
		queryKey: ['projects'],
		queryFn: async () => {
			const res = await fetch('/db/projects/converted_data.json')

			return await res.json()
		},
	})
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

	const statusCounts =
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
			) || {} // ✅ Если `data?.Projects` undefined, вернётся пустой объект
		)?.map(([_, value]) => value) || []
	console.log(statusCounts)

	return (
		<div className='space-y-10'>
			<header>
				<ThemeText variant='h4' text='Проекты' />
				<p className='text-gray-400'>
					Последний обновления
					<span
						className='font-bold '
						style={{
							color: theme.palette.mode === 'light' ? 'black' : 'white',
						}}
					>
						10.03.2025
					</span>
				</p>
			</header>

			<section>
				<header>
					<ThemeText variant='h4' text='Краткая информация' />
					<p className='text-gray-400'>сравнее прошлым годом</p>
				</header>
				<div className='grid grid-cols-5 gap-5 mt-4'>
					{statusCounts.map((item, index) => (
						<Box
							key={index}
							className=' shadow-md rounded-xl p-4 space-y-2'
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
			</section>

			<section>
				<header>
					<ThemeText variant='h4' text='Информация' />
					<ProjectsTable data={data as Data} />
				</header>
			</section>
		</div>
	)
}

export default Projects
