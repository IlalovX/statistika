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
import { InvestmentAmountItem } from '../../../../types/investment.interface'
import { formatCompactNumber } from '../../../../utils/formatCompactNumber'
import {
	getPercentColor,
	getPercentSign,
} from '../../../../utils/getPercentDisplay'

interface Props {
	data: InvestmentAmountItem[]
}

const AmountModal = ({ data }: Props) => {
	const theme = useTheme()
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
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth='sm'
				fullWidth
				PaperProps={{
					sx: {
						backgroundColor: theme.palette.common.black,
					},
				}}
			>
				<DialogTitle>
					Полученные инвестиции
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
				<DialogContent dividers>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Направление</TableCell>
									<TableCell>Сумма</TableCell>
									<TableCell>Процент</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((item, index) => (
									<TableRow key={index}>
										<TableCell>{item.project_name}</TableCell>
										<TableCell>{formatCompactNumber(item.value)}</TableCell>
										<TableCell>
											{' '}
											<Typography
												variant='body2'
												sx={{ color: getPercentColor(item.percent.status) }}
											>
												{getPercentSign(item.percent.status)}
												{formatCompactNumber(item.percent.value)} %
											</Typography>
										</TableCell>
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

export default AmountModal
