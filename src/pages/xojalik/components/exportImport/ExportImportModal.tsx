import CloseIcon from '@mui/icons-material/Close'
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import { AgricultureTradeSummary } from '../../../../types/agriculture.interface'

interface Props {
	data: AgricultureTradeSummary[]
	year: number
	type: 'export' | 'import'
}

const ExportImportModal = ({ data, type, year }: Props) => {
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
					Список по {type === 'export' ? 'экспорту' : 'импорту'} — {year}
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
					<Box display='flex' flexDirection='column' gap={2}>
						{data.map((item, index) => (
							<Box
								key={index}
								display='flex'
								justifyContent='space-between'
								sx={{
									borderBottom: `1px solid ${theme.palette.divider}`,
									pb: 1,
								}}
							>
								<Typography>{item.country_code}</Typography>
								<Typography fontWeight='bold' color='green'>
									+{item.value}
								</Typography>
							</Box>
						))}
					</Box>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default ExportImportModal
