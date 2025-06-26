// components/ui/dialogs/InvestorsModal.tsx

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
} from '@mui/material'
import { useState } from 'react'
import { InvestmentInvestors } from '../../../../types/investment.interface'

interface Props {
	investors: InvestmentInvestors[]
}

const InvestorsMapModal = ({ investors }: Props) => {
	const [open, setOpen] = useState(false)
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
				onClick={() => handleOpen()}
			>
				Показать все →
			</Button>

			<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
				<DialogTitle>
					Инвесторы из зарубежа
					<IconButton
						aria-label='close'
						onClick={handleClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: theme => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Страна</TableCell>
									<TableCell>Объем инвестиций (T)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{investors.map((item, index) => (
									<TableRow key={index}>
										<TableCell>{item.country.common}</TableCell>
										<TableCell>{item.amount}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					{investors.length === 0 && (
						<Typography textAlign='center' mt={2}>
							Нет данных
						</Typography>
					)}
				</DialogContent>
			</Dialog>
		</>
	)
}

export default InvestorsMapModal
