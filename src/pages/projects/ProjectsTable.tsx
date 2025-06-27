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

type ProjectItem = {
	id: number
	region: string
	initiator: string
	project_name: string
	budget: number
	jobs_created: string
	planned_date: string
	responsible_party: string
	project_status: {
		value: string
		color: string
	}
	last_update: string
	overall_status: string
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
	projects: ProjectItem[]
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
								<TableCell>{project.region}</TableCell>
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
								<TableCell>{project.last_update}</TableCell>
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
