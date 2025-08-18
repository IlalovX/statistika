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
import { AgricultureFirmsItem } from '../../../../types/agriculture.interface'

interface Props {
	data: AgricultureFirmsItem[]
}

function CompaniesModal({ data }: Props) {
	const [open, setOpen] = useState(false)
	const theme = useTheme()
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	return (
		<>
			<Button
				variant='text'
				sx={{
					alignSelf: 'start',
					mt: 1,
					fontWeight: 'bold',
					color: 'primary.main',
				}}
				onClick={handleOpen}
			>
				Показать все →
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth
				maxWidth='md'
				PaperProps={{
					sx: {
						backgroundColor: theme.palette.background.default,
					},
				}}
			>
				<DialogTitle className='flex justify-between items-center'>
					<Typography variant='h6'>Статистика по компании</Typography>
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
								<TableRow sx={{}}>
									<TableCell>Регион</TableCell>
									<TableCell>Количество</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((item) => (
									<TableRow>
										<TableCell>{item.year}</TableCell>
										<TableCell>{item.count}</TableCell>
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

export default CompaniesModal
