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
	TableHead,
	TableRow,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import { InvestmentProjectRegions } from '../../../../types/investment.interface'

interface Props {
	data: InvestmentProjectRegions[]
}

function InvestmentProjectsRegionModal({ data }: Props) {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const theme = useTheme()
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

			<Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
				<DialogTitle sx={{ m: 0, p: 2 }}>
					Полный список регионов
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
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<strong>Регион</strong>
								</TableCell>
								<TableCell>
									<strong>Количество</strong>
								</TableCell>
								<TableCell>
									<strong>Процент</strong>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.region_name}</TableCell>
									<TableCell>{item.value} T</TableCell>
									<TableCell>{item.percent}%</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default InvestmentProjectsRegionModal
