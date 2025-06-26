import CloseIcon from '@mui/icons-material/Close'

import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import { AgricultureWaterLimitProduct } from '../../../../types/agriculture.interface'

interface Props {
	data: AgricultureWaterLimitProduct[]
}

function WaterModal({ data }: Props) {
	const [open, setOpen] = useState(false)
	const theme = useTheme()
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	return (
		<>
			<Button
				variant='text'
				sx={{
					alignSelf: 'end',
					mt: 1,
					fontWeight: 'bold',
					color: 'primary.main',
				}}
				onClick={handleOpen}
			>
				Показать все →
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
				<DialogTitle className='flex justify-between items-center'>
					<Typography variant='h6'>Статистика воды</Typography>
					<IconButton
						aria-label='close'
						onClick={handleClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>

				<DialogContent>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Регион</TableCell>
									<TableCell>Количество</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map(item => (
									<TableRow>
										<TableCell>{item.product}</TableCell>
										<TableCell>{item.value}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default WaterModal
