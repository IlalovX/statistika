import {
	Box,
	Button,
	CircularProgress,
	Modal,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

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
]

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

export default function CustomTable() {
	const theme = useTheme()
	const [modalOpen, setModalOpen] = useState(false)
	const [selectedProject, setSelectedProject] = useState<Project | null>(null)
	const { data, isLoading, error } = useQuery<Data>({
		queryKey: ['tourismprojects'],
		queryFn: async () => {
			const res = await fetch('/db/projects/converted_data.json')
			if (!res.ok) throw new Error('Ошибка загрузки данных')
			return await res.json()
		},
	})

	const handleOpenModal = ({ project }: { project: Project | null }) => {
		setSelectedProject(project)
		setModalOpen(true)
	}

	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
				mt: 5,
				borderRadius: 5,
				p: 2,
			}}
		>
			{isLoading ? (
				<Box display='flex' justifyContent='center'>
					<CircularProgress />
				</Box>
			) : error ? (
				<Box textAlign='center' color='red'>
					Ошибка загрузки данных
				</Box>
			) : (
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
										}
										if (column.id === 'general_status') {
											return (
												<TableCell key={column.id} align={column.align}>
													<Button
														variant='contained'
														color='primary'
														onClick={() => handleOpenModal({ project: row })}
													>
														Подробнее
													</Button>
												</TableCell>
											)
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
			)}
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
					<Typography variant='h5'>
						{
							data?.Authorities[
								selectedProject ? selectedProject?.authority_id : 0
							].name
						}
					</Typography>
					<Typography variant='body2'>{selectedProject?.name}</Typography>
					<br />
					<Typography variant='body1'>
						{selectedProject?.general_status}
					</Typography>
				</Box>
			</Modal>
		</Box>
	)
}
