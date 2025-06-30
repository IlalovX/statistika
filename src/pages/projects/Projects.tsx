import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Autocomplete, Button, TextField, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import DownloadProjectsExcelButton from '../../components/common/DownloanButton/DownloadButton'
import ThemeText from '../../components/ThemeText'
import { updateProjectCount } from '../../features/slices/Projects'
import {
	useGetProjectsLastUpdate,
	useGetProjectsList,
	useGetProjectsRegionList,
	useGetProjectsStatusList,
	useProjectsSearch,
} from '../../hooks/useProjects'
import { useAppDispatch } from '../../utils/helpers'
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

function Projects() {
	const theme = useTheme()
	const [filterVisible, setFilterVisible] = useState(false)
	const [filterParams, setFilterParams] = useState<FormData | null>(null)
	const dispatch = useAppDispatch()

	const { register, handleSubmit, reset, control } = useForm<FormData>({
		defaultValues: initialFormValues,
	})

	const { data: lastUpdate } = useGetProjectsLastUpdate()
	const { data: allProjects = [] } = useGetProjectsList()
	const { data: regions = [] } = useGetProjectsRegionList()
	const { data: statuses = [] } = useGetProjectsStatusList()

	useEffect(() => {
		if (allProjects) {
			dispatch(updateProjectCount(allProjects.length))
		}
	}, [allProjects, dispatch])

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

	const projectsToDisplay =
		filterParams && Object.values(filterParams).some((val) => val)
			? searchedProjects
			: allProjects

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const cleaned = Object.fromEntries(
			Object.entries(data).filter(([_, val]) => val !== '')
		)
		setFilterParams(Object.keys(cleaned).length ? (cleaned as FormData) : null)
		reset(data) // сохраняем значения в форме после сабмита
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
				<header>
					<ThemeText variant='h4' text='Краткая информация' />
					<p className='text-gray-400'>сравнее прошлым годом</p>
				</header>
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
					</div>

					{filterVisible && (
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex justify-between items-end gap-5 mt-5'
						>
							{/* Регионы */}
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
													variant='outlined'
												/>
											)}
											openOnFocus={false}
											noOptionsText='Нет совпадений'
											ListboxProps={{
												style: {
													backgroundColor:
														theme.palette.mode === 'light'
															? theme.palette.common.white
															: theme.palette.grey[900],
													boxShadow: theme.shadows[4],
												},
											}}
										/>
									)}
								/>
							</div>

							{/* Стоимость */}
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

							{/* Статус */}
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
												renderOption={(props, option) => (
													<li {...props} style={{ color: option.color }}>
														{option.name}
													</li>
												)}
												renderInput={(params) => (
													<TextField
														{...params}
														placeholder='Статус'
														size='small'
														fullWidth
														variant='outlined'
														InputProps={{
															...params.InputProps,
															style: {
																color: selectedStatus?.color ?? 'inherit',
															},
														}}
													/>
												)}
												openOnFocus={false}
												noOptionsText='Нет совпадений'
												ListboxProps={{
													style: {
														backgroundColor:
															theme.palette.mode === 'light'
																? theme.palette.common.white
																: theme.palette.grey[900],
														boxShadow: theme.shadows[4],
													},
												}}
											/>
										)
									}}
								/>
							</div>

							{/* Кнопки */}
							<div className='flex gap-2'>
								<Button
									variant='outlined'
									type='reset'
									sx={{ height: '40px' }}
									onClick={handleReset}
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

				<ProjectsTable projects={projectsToDisplay} />
			</section>
		</div>
	)
}

export default Projects
