'use client'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Button, MenuItem, TextField, useTheme } from '@mui/material'
import { useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import ThemeText from '../../components/ThemeText'
import ProjectStatusCards from '../../components/ui/projectsStatusCards/ProjectStatusCards'
import ProjectsTable from '../../components/ui/projectsTable/ProjectsTable'
import { getAuthorities } from '../../services/queries/authorities'
import {
	getFilterProjects,
	getLastUpdate,
	getProjects,
} from '../../services/queries/projects'
import { getRegions } from '../../services/queries/regions'
import { getStatuses } from '../../services/queries/statuses'

interface FormData {
	region_id?: string
	budget_min: string
	budget_max: string
	status_id?: string
}

function Projects() {
	const [filter, setFilter] = useState(false)
	const { register, handleSubmit, reset, control } = useForm<FormData>({
		defaultValues: {
			region_id: '',
			budget_min: '',
			budget_max: '',
			status_id: '',
		},
	})
	const [filterValues, setFilterValues] = useState<FormData | undefined>(
		undefined
	)

	const { data: projects } = getProjects()
	const { data: regions } = getRegions()
	const { data: statuses } = getStatuses()
	const { data: authorities } = getAuthorities()
	const { data: last_update } = getLastUpdate()
	const { data: filter_data } = getFilterProjects(filterValues)
	const displayedProjects = filterValues ? filter_data || [] : projects || []

	const onSubmit: SubmitHandler<FormData> = data => {
		// Очистка от пустых строк
		const cleaned = Object.fromEntries(
			Object.entries(data).filter(([_, value]) => value !== '')
		)

		setFilterValues(
			Object.keys(cleaned).length === 0 ? undefined : (cleaned as FormData)
		)
	}
	const handleResetForm = () => {
		reset()
		setFilterValues(undefined)
	}

	const theme = useTheme()

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	// Common MenuProps configuration for consistent dropdown behavior
	const menuProps = {
		anchorOrigin: {
			vertical: 'bottom' as const,
			horizontal: 'left' as const,
		},
		transformOrigin: {
			vertical: 'top' as const,
			horizontal: 'left' as const,
		},
		PaperProps: {
			sx: {
				backgroundColor:
					theme.palette.mode === 'light'
						? theme.palette.common.white
						: theme.palette.grey[900],
				boxShadow: theme.shadows[4],
				'& .MuiMenuItem-root': {
					'&:hover': {
						backgroundColor:
							theme.palette.mode === 'light'
								? theme.palette.action.hover
								: theme.palette.action.selected,
					},
				},
			},
		},
	}

	return (
		<div className='space-y-10'>
			<header>
				<ThemeText variant='h4' text='Проекты' />
				<p className='text-gray-400'>
					Последний обновления{' '}
					<span
						className='font-bold '
						style={{
							color: theme.palette.mode === 'light' ? 'black' : 'white',
						}}
					>
						{last_update
							? formatDate(last_update.last_update as string)
							: '01.01.2025'}
					</span>
				</p>
			</header>

			<section>
				<header>
					<ThemeText variant='h4' text='Краткая информация' />
					<p className='text-gray-400'>сравнее прошлым годом</p>
				</header>
				<ProjectStatusCards
					projects={projects ? projects : []}
					statuses={statuses ? statuses : []}
				/>
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
							className='flex justify-between items-end gap-5 mt-5'
						>
							<div className='w-full'>
								{/* Город */}
								<label>Регионы</label>
								<Controller
									name='region_id'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<TextField
											select
											placeholder='Регионы'
											variant='outlined'
											size='small'
											fullWidth
											SelectProps={{
												MenuProps: menuProps,
											}}
											{...field}
										>
											{regions &&
												regions.map(region => (
													<MenuItem key={region.id} value={region.id}>
														{region.name}
													</MenuItem>
												))}
										</TextField>
									)}
								/>
							</div>

							<div className='w-full'>
								<label>Стоимость</label>
								{/* Стоимость (от - до) */}
								<div className='flex items-center gap-2 w-full'>
									<TextField
										placeholder='от'
										{...register('budget_min')}
										variant='outlined'
										size='small'
										fullWidth
									/>
									<span> | </span>
									<TextField
										placeholder='до'
										{...register('budget_max')}
										variant='outlined'
										size='small'
										fullWidth
									/>
								</div>
							</div>

							<div className='w-full'>
								{/* Статус */}
								<label>Статус</label>
								<Controller
									name='status_id'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<TextField
											select
											placeholder='Статус'
											variant='outlined'
											size='small'
											fullWidth
											SelectProps={{
												MenuProps: menuProps,
											}}
											{...field}
										>
											{statuses &&
												statuses.map(status => (
													<MenuItem key={status.id} value={status.id}>
														{status.name}
													</MenuItem>
												))}
										</TextField>
									)}
								/>
							</div>

							{/* Buttons */}
							<div className='flex gap-2'>
								<Button
									variant='outlined'
									type='reset'
									sx={{ height: '40px' }}
									onClick={handleResetForm}
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
				<ProjectsTable
					projects={displayedProjects}
					statuses={statuses ? statuses : []}
					authorities={authorities ? authorities : []}
					regions={regions ? regions : []}
				/>
			</section>
		</div>
	)
}

export default Projects
