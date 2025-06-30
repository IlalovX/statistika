// Projects.tsx
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Autocomplete, Button, TextField, useTheme } from '@mui/material'
import { useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import DownloadProjectsExcelButton from '../../components/common/DownloanButton/DownloadButton'
import ThemeText from '../../components/ThemeText'
import {
	useGetProjectsLastUpdate,
	useGetProjectsList,
	useGetProjectsRegionList,
	useGetProjectsStatusList,
	useProjectsSearch,
} from '../../hooks/useProjects'
import { GetProjects } from '../../types/projects.interface'
import ProjectStatusesCards from './ProjectsStatusesCards'
import ProjectsTable from './ProjectsTable'

interface FormData {
	region_id?: string
	budget_min: string
	budget_max: string
	status_id?: string
}

const initialFormValues: FormData = {
	region_id: '',
	budget_min: '',
	budget_max: '',
	status_id: '',
}

function isDateExpired(date: string): boolean {
	const now = new Date()
	const planned = new Date(date)
	return planned.getTime() < now.getTime()
}

function Projects() {
	const theme = useTheme()
	const [filterVisible, setFilterVisible] = useState(false)
	const [isExpiredFilter, setIsExpiredFilter] = useState(false)
	const [filterParams, setFilterParams] = useState<FormData | null>(null)

	const { register, handleSubmit, reset, control } = useForm<FormData>({
		defaultValues: initialFormValues,
	})

	const { data: lastUpdate } = useGetProjectsLastUpdate()
	const { data: allProjects = [] } = useGetProjectsList()
	const { data: regions = [] } = useGetProjectsRegionList()
	const { data: statuses = [] } = useGetProjectsStatusList()

	const { data: searchedProjects = [] } = useProjectsSearch({
		region_id: filterParams?.region_id ? Number(filterParams.region_id) : null,
		project_initiator: null,
		budget_from: filterParams?.budget_min || null,
		budget_to: filterParams?.budget_max || null,
		responsible_party: null,
		project_status_id: filterParams?.status_id
			? Number(filterParams.status_id)
			: null,
	})

	const baseProjects =
		filterParams && Object.values(filterParams).some((val) => val)
			? searchedProjects
			: allProjects

	const projectsToDisplay = isExpiredFilter
		? (baseProjects as GetProjects[]).filter((project) =>
				isDateExpired(project.planned_date)
			)
		: baseProjects

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const cleaned = Object.fromEntries(
			Object.entries(data).filter(([_, val]) => val !== '')
		)
		setFilterParams(Object.keys(cleaned).length ? (cleaned as FormData) : null)
		reset(data)
	}

	const handleReset = () => {
		reset(initialFormValues)
		setFilterParams(null)
	}
	return (
		<div className='space-y-10'>
			<header>
				<ThemeText variant='h4' text='Проекты' />
				<p className='text-gray-400'>
					Последний обновления{' '}
					<span
						className='font-bold'
						style={{
							color: theme.palette.mode === 'light' ? 'black' : 'white',
						}}
					>
						{lastUpdate}
					</span>
				</p>
			</header>

			<section>
				<ThemeText variant='h4' text='Краткая информация' />
				<p className='text-gray-400'>сравнение с прошлым годом</p>
				<ProjectStatusesCards projects={allProjects} statuses={statuses} />
			</section>

			<section>
				<header>
					<ThemeText variant='h4' text='Информация' />
					<div className='flex items-center justify-end gap-5'>
						<Button
							className='text-black !capitalize !text-2xl'
							onClick={() => setFilterVisible(!filterVisible)}
						>
							Фильтр
							{filterVisible ? (
								<KeyboardArrowUpIcon />
							) : (
								<KeyboardArrowDownIcon />
							)}
						</Button>
						<DownloadProjectsExcelButton />
						<Button
							variant='contained'
							color='primary'
							onClick={() => setIsExpiredFilter((prev) => !prev)}
						>
							Мүддети өткен
						</Button>
					</div>

					{filterVisible && (
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex justify-between items-end gap-5 mt-5'
						>
							{/* Region */}
							<div className='w-full'>
								<label>Регионы</label>
								<Controller
									name='region_id'
									control={control}
									render={({ field: { onChange, value, ...field } }) => (
										<Autocomplete
											{...field}
											options={regions}
											getOptionLabel={(option) =>
												typeof option === 'object'
													? (option.name as string)
													: ''
											}
											isOptionEqualToValue={(option, value) => {
												if (!value) return false
												return option.id === +value
											}}
											onChange={(_, newValue) => {
												onChange(newValue ? newValue.id : '')
											}}
											value={
												regions.find(
													(region) => String(region.id) === String(value)
												) || null
											}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder='Регионы'
													size='small'
													fullWidth
												/>
											)}
										/>
									)}
								/>
							</div>

							{/* Budget */}
							<div className='w-full'>
								<label>Стоимость ($млн)</label>
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

							{/* Status */}
							<div className='w-full'>
								<label>Статус</label>
								<Controller
									name='status_id'
									control={control}
									render={({ field: { onChange, value, ...field } }) => {
										const selectedStatus = statuses.find(
											(status) => status.id === +(value as string)
										)
										return (
											<Autocomplete
												{...field}
												options={statuses}
												getOptionLabel={(option) => option.name as string}
												isOptionEqualToValue={(option, value) =>
													option.id === value.id
												}
												onChange={(_, newValue) => {
													onChange(newValue ? newValue.id : undefined)
												}}
												value={selectedStatus || null}
												renderInput={(params) => (
													<TextField
														{...params}
														placeholder='Статус'
														size='small'
														fullWidth
													/>
												)}
											/>
										)
									}}
								/>
							</div>

							{/* Buttons */}
							<div className='flex gap-2'>
								<Button variant='outlined' type='reset' onClick={handleReset}>
									Отмена
								</Button>
								<Button variant='contained' type='submit' color='primary'>
									Фильтр
								</Button>
							</div>
						</form>
					)}
				</header>

				<ProjectsTable
					projects={projectsToDisplay}
					isExpiredFilter={isExpiredFilter}
				/>
			</section>
		</div>
	)
}

export default Projects
