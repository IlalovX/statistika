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
	useProjectsSearch,
} from '../../hooks/useProjects'
import { useGetProjectsStatusesList } from '../../hooks/useProjectsStatuses'
import { useGetRegionsList } from '../../hooks/useRegions'
import ProjectStatusesCards from './ProjectsStatusesCards'
import ProjectsTable from './ProjectsTable'

interface FormData {
	region_id?: string
	budget_min: string
	budget_max: string
	status_id?: string
}

function Projects() {
	const [filterVisible, setFilterVisible] = useState(false)
	const theme = useTheme()
	const [filterParams, setFilterParams] = useState<FormData | null>(null)

	const { register, handleSubmit, reset, control } = useForm<FormData>({
		defaultValues: {
			region_id: '',
			budget_min: '',
			budget_max: '',
			status_id: '',
		},
	})

	const { data: lastUpdate } = useGetProjectsLastUpdate()
	const { data: allProjects = [] } = useGetProjectsList()
	const { data: regions = [] } = useGetRegionsList()
	const { data: statuses = [] } = useGetProjectsStatusesList()

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
		filterParams && Object.values(filterParams).some(val => val)
			? searchedProjects
			: allProjects

	const onSubmit: SubmitHandler<FormData> = data => {
		const cleaned = Object.fromEntries(
			Object.entries(data).filter(([_, val]) => val !== '')
		)
		setFilterParams(Object.keys(cleaned).length ? (cleaned as FormData) : null)
	}
	const handleReset = () => {
		reset()
		setFilterParams(null)
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
						{lastUpdate}
					</span>
				</p>
			</header>

			<section>
				<header>
					<ThemeText variant='h4' text='Краткая информация' />
					<p className='text-gray-400'>сравнее прошлым годом</p>
				</header>
				<ProjectStatusesCards
					projects={allProjects ? allProjects : []}
					statuses={statuses ? statuses : []}
				/>
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
							<div className='w-full'>
								{/* Город */}
								<label>Регионы</label>
								<Controller
									name='region_id'
									control={control}
									defaultValue=''
									render={({ field: { onChange, value, ...field } }) => (
										<Autocomplete
											{...field}
											options={regions || []}
											getOptionLabel={option =>
												typeof option === 'object' ? option.region_name : ''
											}
											isOptionEqualToValue={(option, value) => {
												if (value === null || value === undefined) return false
												return typeof value === 'object' && 'id' in value
													? option.id === value.id
													: option.id === value
											}}
											onChange={(_, newValue) => {
												onChange(newValue ? newValue.id : '')
											}}
											value={
												regions?.find(
													region => String(region.id) === String(value)
												) || null
											}
											renderInput={params => (
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

							<div className='w-full'>
								<label>Стоимость ($млн)</label>
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
									render={({ field: { onChange, value, ...field } }) => (
										<Autocomplete
											{...field}
											options={statuses || []}
											getOptionLabel={option =>
												typeof option === 'object' ? option.value : ''
											}
											isOptionEqualToValue={(option, value) => {
												if (value === null || value === undefined) return false
												return typeof value === 'object' && 'id' in value
													? option.id === value.id
													: option.id === +value
											}}
											onChange={(_, newValue) => {
												onChange(newValue ? newValue.id : '')
											}}
											value={
												statuses?.find(
													status => String(status.id) === String(value)
												) || null
											}
											renderInput={params => (
												<TextField
													{...params}
													placeholder='Статус'
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

							{/* Buttons */}
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
