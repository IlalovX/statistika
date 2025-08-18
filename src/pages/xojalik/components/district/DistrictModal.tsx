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
import { AgricultureDistrictGeneral } from '../../../../types/agriculture.interface'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'
import { default as arrowDown } from '/svg/Polygon 2.svg'

interface Props {
	data: AgricultureDistrictGeneral[]
	isLoading: boolean
}

function DistrictModal({ data, isLoading }: Props) {
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
					<Typography variant='h6'>Статистика по регионам</Typography>
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
								<TableRow
									sx={{
										display: 'grid',
										gridTemplateColumns: '2fr 1fr',
									}}
								>
									<TableCell>Регион</TableCell>
									<TableCell>Количество</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((row: AgricultureDistrictGeneral) => (
									<TableRow
										key={row.region_id}
										sx={{
											display: 'grid',
											gridTemplateColumns: '2fr 1fr',
										}}
									>
										<TableCell>{row.region_name}</TableCell>
										<TableCell
											sx={{
												display: 'grid',
												gridTemplateColumns: '1fr 1fr 1fr',
												alignItems: 'center',
											}}
										>
											<span>{row.weight} т</span>
											<img
												src={row.percent.status === 'up' ? arrowUp : arrowDown}
												alt='percent arrow'
												width={14}
											/>
											<span>{row.percent.value}%</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					{!data.length && !isLoading && (
						<Typography align='center' className='mt-4 text-gray-400'>
							Нет данных за выбранный год
						</Typography>
					)}
				</DialogContent>
			</Dialog>
		</>
	)
}

export default DistrictModal
