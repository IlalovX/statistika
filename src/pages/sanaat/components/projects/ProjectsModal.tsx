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
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import { InvestmentProjectsItem } from '../../../../types/investment.interface'
import {
	getPercentColor,
	getPercentSign,
} from '../../../../utils/getPercentDisplay'

interface Props {
	data: InvestmentProjectsItem[]
}

const ProjectsModal = ({ data }: Props) => {
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
						backgroundColor: theme.palette.background.default,
					},
				}}
			>
				<DialogTitle>
					{' '}
					Проекты
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
									<TableCell>Количество</TableCell>
									<TableCell>Процент</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((item) => (
									<TableRow key={item.project_name}>
										<TableCell>{item.project_name}</TableCell>
										<TableCell>{item.value}</TableCell>
										<TableCell
											sx={{ color: getPercentColor(item.percent.status) }}
										>
											{getPercentSign(item.percent.status)}
											{item.percent.value}%
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

export default ProjectsModal
