import CloseIcon from '@mui/icons-material/Close'
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material'
import { useState, type FC } from 'react'
import { InvestmentOutputItem } from '../../../../types/investment.interface'

interface Props {
	data: InvestmentOutputItem[]
}

const OutputModal: FC<Props> = ({ data }) => {
	const [open, setModalOpen] = useState(false)
	const onClose = () => setModalOpen(false)
	const total = data.reduce((acc, item) => acc + item.amount, 0)

	return (
		<>
			<Button
				variant='text'
				onClick={() => setModalOpen(true)}
				sx={{
					alignSelf: 'end',
					mt: 1,
					fontWeight: 'bold',
					color: 'primary.main',
				}}
			>
				Показать все →
			</Button>
			<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
				<DialogTitle>
					Общий список отраслей
					<IconButton
						aria-label='close'
						onClick={onClose}
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
					<Typography variant='subtitle1' mb={2}>
						Общая сумма: ${total.toLocaleString('ru-RU')} млн
					</Typography>
					<List>
						{data.map((item, index) => (
							<ListItem
								key={index}
								sx={{ display: 'flex', justifyContent: 'space-between' }}
							>
								<ListItemText primary={item.industry_type} />
								<Typography fontWeight='bold'>${item.amount} млн</Typography>
							</ListItem>
						))}
					</List>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default OutputModal
