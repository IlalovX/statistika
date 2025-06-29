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

const colums: string[] = [
	'№',
	'Регион',
	'Инициатор проекта',
	'Название проекта',
	'Стоимость проекта (млн долл)',
	'Созданное рабочее место',
	'Срок запуска',
	'Ответственный',
	'Статус',
	'Последнее обновление',
	'Общее состояние',
]

export default function ProjectsTable({
	projects,
}: {
	projects: GetProjects[]
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
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{colums.map((header, index) => (
								<TableCell key={index} sx={{ fontWeight: 'bold' }}>
									{header}
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
								<TableCell>{project.project_name}</TableCell>
								<TableCell>{project.budget.toFixed(2)}</TableCell>
								<TableCell>{project.jobs_created}</TableCell>
								<TableCell>
									{new Date(
										project.planned_date.replace(' ', 'T')
									).toLocaleDateString('ru-RU')}
								</TableCell>
								<TableCell>{project.responsible_party}</TableCell>
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
