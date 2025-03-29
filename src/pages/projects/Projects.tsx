import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Button, MenuItem, TextField, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ThemeText from '../../components/ThemeText'
import ProjectStatusCards from '../../components/ui/projectsStatusCards/ProjectStatusCards'
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

export interface Data {
	Regions: Region[]
	Authorities: Authority[]
	Statuses: Status[]
	Projects: Project[]
}

const cities = ['Нукус', 'Ташкент', 'Самарканд', 'Бухара', 'Хива', 'Шахрисабз']
interface FormData {
	city?: string
	projectName?: string
	cost?: number
	status?: string
}
function Projects() {
	const [filter, setFilter] = useState(false)
	const { register, handleSubmit } = useForm<FormData>()

	const onSubmit: SubmitHandler<FormData> = data => {
		console.log(data)
	}

	const theme = useTheme()
	const { data } = useQuery<Data>({
		queryKey: ['projects'],
		queryFn: async () => {
			const res = await fetch('/db/projects/converted_data.json')

			return await res.json()
		},
	})

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
				<ProjectStatusCards data={data as Data} />
			</section>

			<section>
				<header>
					<ThemeText variant='h4' text='Информация' />
					<div className='flex items-center justify-end'>
						<Button
							className='text-black !capitalize !text-2xl'
							onClick={() => setFilter(!filter)}
						>
							Фильтр
							{filter ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</Button>
					</div>
					{filter && (
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex items-center justify-between w-full gap-5 mt-5'
						>
							<TextField
								select
								label='Города'
								{...register('city')}
								variant='outlined'
								size='small'
								fullWidth
							>
								{cities.map(city => (
									<MenuItem key={city} value={city}>
										{city}
									</MenuItem>
								))}
							</TextField>

							<TextField
								label='Название проекта'
								{...register('projectName')}
								variant='outlined'
								size='small'
								fullWidth
							/>
							<TextField
								label='Стоимость'
								{...register('cost')}
								variant='outlined'
								size='small'
								fullWidth
							/>
							<TextField
								label='Статус'
								{...register('status')}
								variant='outlined'
								size='small'
								fullWidth
							/>
							<div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
								<Button
									variant='outlined'
									type='reset'
									sx={{ height: '40px' }}
								>
									Отмена
								</Button>
								<Button
									variant='contained'
									type='submit'
									color='primary'
									sx={{ height: '40px' }}
								>
									Фильтр
								</Button>
							</div>
						</form>
					)}
				</header>
				<ProjectsTable data={data as Data} />
			</section>
		</div>
	)
}

export default Projects
