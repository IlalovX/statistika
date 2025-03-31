import {
	Box,
	Button,
	colors,
	MenuItem,
	Modal,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Data, Project } from '../../../types/projects'
import AdminProjectsAddModal from './AdminProjectsAddModal'

interface Column {
	id:
		| 'region_id'
		| 'initiator'
		| 'name'
		| 'budget_million'
		| 'jobs_created'
		| 'completion_date'
		| 'authority_id'
		| 'status_id'
		| 'general_status'
		| 'edit'
	label: string
	minWidth?: number
	align?: 'left'
}

const columns: readonly Column[] = [
	{ id: 'region_id', label: 'Город', minWidth: 120 },
	{ id: 'initiator', label: 'Инициатор проекта', minWidth: 200 },
	{ id: 'name', label: 'Название проекта', minWidth: 200 },
	{
		id: 'budget_million',
		label: 'Стоимость проекта (млн долл)',
		minWidth: 70,
		align: 'left',
	},
	{
		id: 'jobs_created',
		label: 'Созданное рабочее место',
		minWidth: 70,
		align: 'left',
	},
	{ id: 'completion_date', label: 'Срок запуска', minWidth: 170 },
	{ id: 'authority_id', label: 'Ответственный', minWidth: 200 },
	{ id: 'status_id', label: 'Статус', minWidth: 150 },
	{ id: 'general_status', label: 'Общее состояние', minWidth: 150 },
	{ id: 'edit', label: 'Изменить', minWidth: 150 },
]

const formatText = (text: string) => {
	const parts = text.split(/(Ижро ҳолати:|Муаммо:|Таклиф:)/g)

	return parts.map((part, index) =>
		['Ижро ҳолати:', 'Муаммо:', 'Таклиф:'].includes(part) ? (
			<strong key={index}>{part}</strong>
		) : (
			<span key={index}>{part}</span>
		)
	)
}

export default function AdminProjectsTable() {
	const { data } = useQuery<Data>({
		queryKey: ['projects'],
		queryFn: async () => {
			const res = await fetch('/db/projects/converted_data.json')

			return await res.json()
		},
	})

	const theme = useTheme()
	const [modalOpen, setModalOpen] = useState(false)
	const [typeModal, setTypeModal] = useState('more')
	const [selectedProject, setSelectedProject] = useState<Project | null>(null)

	const handleOpenModal = ({ project }: { project: Project | null }) => {
		setSelectedProject(project)
		if (project && data) {
			reset({
				region:
					data.Regions.find(r => r.id === project.region_id)?.name ||
					'Неизвестный регион',
				initiator: project.initiator,
				name: project.name,
				budget: String(project.budget_million),
				jobsCreated: String(project.jobs_created),
				completionDate: project.completion_date,
				responsible:
					data.Authorities.find(a => a.id === project.authority_id)?.name ||
					'Неизвестный ответственный',
				status:
					data.Statuses.find(s => s.id === project.status_id)?.name ||
					'Неизвестный статус',
				reason: project.general_status,
				generalStatus: project.general_status,
			})
		}
		setModalOpen(true)
		setModalOpen(true)
	}

	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			region: '',
			initiator: '',
			name: '',
			budget: '',
			jobsCreated: '',
			completionDate: '',
			responsible: '',
			status: '',
			reason: '',
			generalStatus: '',
		},
	})

	const onSubmit = (data: any) => {
		console.log('Updated Data:', data)
		setModalOpen(false)
	}
	return (
		<>
			<header>
				<AdminProjectsAddModal />
			</header>
			<Box
				sx={{
					bgcolor: 'background.paper',
					border: `1px solid ${theme.palette.divider}`,
					mt: 5,
					borderRadius: 5,
					p: 2,
				}}
			>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								{columns.map(column => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.Projects?.map(row => (
								<TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
									{columns.map(column => {
										let value = row[column.id as keyof Project]

										if (column.id === 'region_id') {
											value =
												data.Regions.find(r => r.id === row.region_id)?.name ||
												'Неизвестный регион'
										}
										if (column.id === 'authority_id') {
											value =
												data.Authorities.find(a => a.id === row.authority_id)
													?.name || 'Неизвестный ответственный'
										}

										if (column.id === 'status_id') {
											value =
												data.Statuses.find(s => s.id === row.status_id)?.name ||
												'Неизвестный статус'
											return (
												<TableCell
													key={column.id}
													align={column.align}
													sx={{
														color:
															colors[value as keyof typeof colors] || 'black',
													}}
												>
													{value}
												</TableCell>
											)
										}

										if (column.id === 'general_status') {
											return (
												<TableCell key={column.id} align={column.align}>
													<Button
														variant='contained'
														color='primary'
														onClick={() => {
															handleOpenModal({ project: row })
															setTypeModal('more')
														}}
													>
														Подробнее
													</Button>
												</TableCell>
											)
										}

										if (column.id === 'edit') {
											return (
												<TableCell key={column.id} align={column.align}>
													<Button
														variant='contained'
														color='primary'
														onClick={() => {
															handleOpenModal({ project: row })
															setTypeModal('edit')
														}}
													>
														Изменить
													</Button>
												</TableCell>
											)
										}
										if (column.id === 'budget_million') {
											value = Number(value).toFixed(2)
										}

										return (
											<TableCell key={column.id} align={column.align}>
												{value}
											</TableCell>
										)
									})}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: 600,
							bgcolor:
								theme.palette.mode === 'dark'
									? theme.palette.background.default
									: theme.palette.background.paper,
							boxShadow: 24,
							p: 4,
						}}
					>
						{typeModal == 'more' && (
							<Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
								{selectedProject?.general_status &&
									formatText(selectedProject.general_status)}
							</Typography>
						)}
						{typeModal == 'edit' && (
							<div>
								<Typography variant='h6' align='center' mb={2}>
									Изменить данные
								</Typography>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='grid grid-cols-2 gap-3 grid-rows-4 mb-3'>
										<Controller
											name='region'
											control={control}
											render={({ field }) => (
												<TextField label='Город' {...field} fullWidth />
											)}
										/>
										<Controller
											name='initiator'
											control={control}
											render={({ field }) => (
												<TextField
													label='Инициатор проекта'
													{...field}
													fullWidth
												/>
											)}
										/>
										<Controller
											name='name'
											control={control}
											render={({ field }) => (
												<TextField
													label='Название проекта'
													{...field}
													fullWidth
												/>
											)}
										/>
										<Controller
											name='budget'
											control={control}
											render={({ field }) => (
												<TextField
													label='Проектная стоимость (млн долл)'
													{...field}
													fullWidth
													value={Number(field.value).toFixed(2)}
													onChange={e => field.onChange(e.target.value)}
												/>
											)}
										/>
										<Controller
											name='jobsCreated'
											control={control}
											render={({ field }) => (
												<TextField
													label='Созданное рабочее место'
													{...field}
													fullWidth
												/>
											)}
										/>

										<Controller
											name='completionDate'
											control={control}
											render={({ field }) => (
												<TextField
													type='date'
													label='Срок запуска'
													{...field}
													fullWidth
												/>
											)}
										/>

										<Controller
											name='responsible'
											control={control}
											render={({ field }) => (
												<TextField label='Ответственный' {...field} fullWidth />
											)}
										/>

										<Controller
											name='status'
											control={control}
											render={({ field }) => (
												<Select {...field} fullWidth>
													<MenuItem value='Истиқболсиз'>Истиқболсиз</MenuItem>
													<MenuItem value='Бошланмаган'>Бошланмаган</MenuItem>
												</Select>
											)}
										/>
									</div>

									<Controller
										name='generalStatus'
										control={control}
										render={({ field }) => (
											<TextField
												label='Общее состояние'
												{...field}
												fullWidth
												multiline
												rows={3}
											/>
										)}
									/>
									<Button
										type='submit'
										variant='contained'
										fullWidth
										sx={{ mt: 2 }}
									>
										Изменить
									</Button>
								</form>
							</div>
						)}
					</Box>
				</Modal>
			</Box>
		</>
	)
}
