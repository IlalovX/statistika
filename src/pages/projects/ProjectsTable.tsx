import {
	Box,
	Button,
	Modal,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { GetProjects } from '../../types/projects.interface'

function isOlderThanMonth(date: string | Date): boolean {
	const updated = new Date(date)
	const now = new Date()
	const diffInDays = (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24)
	return diffInDays > 30
}

function isDateExpired(date: string): boolean {
	const now = new Date()
	const planned = new Date(date)
	return planned.getTime() < now.getTime()
}

const columns: { label: string; width?: number }[] = [
	{ label: '№', width: 40 },
	{ label: 'Регион', width: 120 },
	{ label: 'Инициатор проекта', width: 200 },
	{ label: 'Название проекта', width: 250 },
	{ label: 'Стоимость проекта (млн долл)', width: 110 },
	{ label: 'Созданное рабочее место', width: 100 },
	{ label: 'Срок запуска', width: 140 },
	{ label: 'Ответственный', width: 180 },
	{ label: 'Статус', width: 120 },
	{ label: 'Последнее обновление', width: 160 },
	{ label: 'Общее состояние', width: 160 },
]

export default function ProjectsTable({
	projects,
	isExpiredFilter,
}: {
	projects: GetProjects[]
	isExpiredFilter: boolean
}) {
	const [modalOpen, setModalOpen] = useState(false)
	const [modalContent, setModalContent] = useState<string>('')

	const handleOpenModal = (text: string) => {
		setModalContent(text)
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
		setModalContent('')
	}

	return (
		<Box mt={5}>
			<TableContainer
				component={Paper}
				sx={{
					maxHeight: 700,
					overflowY: 'auto',
				}}
			>
				<Table sx={{ tableLayout: 'fixed' }}>
					<TableHead>
						<TableRow>
							{columns.map((col, index) => (
								<TableCell
									sx={{
										fontWeight: 'bold',
										width: col.width,
										position: 'sticky',
										top: 0,
										zIndex: 1,
										backgroundColor: 'background.paper',
									}}
									key={index}
								>
									{col.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{projects.map((project, index) => (
							<TableRow key={project.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{project.region.name}</TableCell>
								<TableCell>{project.initiator}</TableCell>
								<TableCell sx={{ whiteSpace: 'normal' }}>
									{project.project_name}
								</TableCell>
								<TableCell>{project.budget.toFixed(2)}</TableCell>
								<TableCell>{project.jobs_created}</TableCell>
								<TableCell>
									{new Date(
										project.planned_date.replace(' ', 'T')
									).toLocaleDateString('ru-RU')}
									{isExpiredFilter && isDateExpired(project.planned_date) && (
										<span style={{ color: 'red', marginLeft: 4 }}>(Истек)</span>
									)}
								</TableCell>
								<TableCell
									sx={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}
								>
									{project.responsible_party}
								</TableCell>
								<TableCell sx={{ color: project.project_status.color }}>
									{project.project_status.value}
								</TableCell>
								<TableCell
									sx={{
										color: isOlderThanMonth(project.last_update)
											? 'error.main'
											: 'inherit',
										fontWeight: isOlderThanMonth(project.last_update)
											? 'bold'
											: 'normal',
									}}
								>
									{new Date(project.last_update).toLocaleDateString('ru-RU')}
								</TableCell>
								<TableCell>
									<Button
										variant='outlined'
										size='small'
										onClick={() => handleOpenModal(project.overall_status)}
									>
										Подробнее
									</Button>
								</TableCell>
							</TableRow>
						))}
						{projects.length === 0 && (
							<TableRow>
								<TableCell colSpan={11} align='center'>
									Нет данных
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<Modal open={modalOpen} onClose={handleCloseModal}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 600,
						bgcolor: 'background.default',
						borderRadius: 2,
						boxShadow: 24,
						p: 4,
						maxHeight: '80vh',
						overflowY: 'auto',
					}}
				>
					<Typography variant='h6' gutterBottom>
						Общее состояние проекта
					</Typography>
					<Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
						{modalContent}
					</Typography>
				</Box>
			</Modal>
		</Box>
	)
}
