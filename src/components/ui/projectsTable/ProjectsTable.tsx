import {
	Box,
	Button,
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
import { useState } from 'react'
import {
	AuthoritiesSuccessType,
	ProjectSuccessType,
	RegionsSuccessType,
	StatusesSuccessType,
} from '../../../types/queries'

interface Column {
	id:
		| 'id'
		| 'region_id'
		| 'initiator'
		| 'name'
		| 'budget_million'
		| 'jobs_created'
		| 'completion_date'
		| 'authority_id'
		| 'status_id'
		| 'updated_at'
		| 'general_status'
	label: string
	minWidth?: number
	align?: 'left'
}

const columns: readonly Column[] = [
	{ id: 'id', label: 'ID', minWidth: 50 },
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
	{ id: 'updated_at', label: 'Последнее обновление', minWidth: 150 },
	{ id: 'general_status', label: 'Общее состояние', minWidth: 150 },
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

export default function ProjectsTable({
	projects,
	statuses,
	authorities,
	regions,
}: {
	projects: ProjectSuccessType[]
	authorities: AuthoritiesSuccessType[]
	regions: RegionsSuccessType[]
	statuses: StatusesSuccessType[]
}) {
	const theme = useTheme()
	const [modalOpen, setModalOpen] = useState(false)
	const [selectedProject, setSelectedProject] =
		useState<ProjectSuccessType | null>(null)

	const handleOpenModal = ({
		project,
	}: {
		project: ProjectSuccessType | null
	}) => {
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
			<TableContainer sx={{ maxWidth: '100%' }}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									sx={{
										fontWeight: 'bold',
										bgcolor: 'background.paper',
									}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{projects && projects.length > 0 ? (
							projects.map((row, index) => (
								<TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
									{columns.map(column => {
										let value = row[column.id as keyof ProjectSuccessType]
										if (column.id === 'id') {
											return (
												<TableCell key={column.id} align={column.align}>
													{index + 1}
												</TableCell>
											)
										}
										if (column.id === 'region_id') {
											value =
												regions?.find(r => r.id === row?.region_id)?.name ||
												'Неизвестный регион'
										}
										if (column.id === 'authority_id') {
											value =
												authorities?.find(a => a.id === row?.authority_id)
													?.name || 'Неизвестный ответственный'
										}

										if (column.id === 'status_id') {
											value =
												statuses?.find(s => s.id === row?.status_id)?.name ||
												'Неизвестный статус'
										}

										if (column.id === 'general_status') {
											return (
												<TableCell key={column.id} align={column.align}>
													<Button
														variant='contained'
														color='primary'
														onClick={() => {
															handleOpenModal({ project: row })
														}}
													>
														Подробнее
													</Button>
												</TableCell>
											)
										}

										if (column.id === 'budget_million') {
											value = new Intl.NumberFormat('ru-RU', {
												minimumFractionDigits: 2,
											}).format(Number(value))
										}

										if (column.id === 'completion_date' && value) {
											value = new Date(value).toLocaleDateString('ru-RU')
										}

										if (column.id === 'updated_at' && value) {
											value = new Date(value).toLocaleDateString('ru-RU')
										}

										return (
											<TableCell key={column.id} align={column.align}>
												{value}
											</TableCell>
										)
									})}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} align='center'>
									Нет данных
								</TableCell>
							</TableRow>
						)}
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
					<Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
						{selectedProject?.general_status &&
							formatText(selectedProject.general_status)}
					</Typography>
				</Box>
			</Modal>
		</Box>
	)
}
