import {
	Box,
	Button,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

function AdminProjectsAddModal() {
	const theme = useTheme()
	const [openModal, setModalOpen] = useState(false)
	const { control, handleSubmit } = useForm({
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
		<div className='flex justify-end items-center'>
			<Button variant='contained' onClick={() => setModalOpen(true)}>
				Добавить
			</Button>
			<Modal open={openModal} onClose={() => setModalOpen(false)}>
				<form onSubmit={handleSubmit(onSubmit)}>
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
						<Typography variant='h6' align='center' mb={2}>
							Добавить данные
						</Typography>
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
									<TextField label='Инициатор проекта' {...field} fullWidth />
								)}
							/>
							<Controller
								name='name'
								control={control}
								render={({ field }) => (
									<TextField label='Название проекта' {...field} fullWidth />
								)}
							/>
							<Controller
								name='budget'
								control={control}
								render={({ field }) => (
									<TextField label='Проектная стоимость (млн долл)' {...field} fullWidth />
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
									<TextField type='date' {...field} fullWidth />
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
						<Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
							Добавить
						</Button>
					</Box>
				</form>
			</Modal>
		</div>
	)
}

export default AdminProjectsAddModal
