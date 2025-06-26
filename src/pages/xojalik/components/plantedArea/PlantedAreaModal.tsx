import { Agriculture } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import {
	Avatar,
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
import { AgriculturePlacement } from '../../../../types/agriculture.interface'
import { getPercentSign } from '../../../../utils/getPercentDisplay'

interface Props {
	placement: AgriculturePlacement[]
}

function PlantedAreaModal({ placement }: Props) {
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
					Показатели
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
					<TableContainer className='mt-4 min-h-80'>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell>Площадь</TableCell>
									<TableCell>Посажено</TableCell>
									<TableCell>Урожай</TableCell>
									<TableCell>Процент</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{placement?.slice(0, 6).map((item, index) => (
									<TableRow key={index}>
										<TableCell>
											<Typography className='flex items-center gap-2 font-medium'>
												<Avatar sx={{ width: 24, height: 24 }}>
													<Agriculture fontSize='small' />
												</Avatar>
												{item.product}
											</Typography>
										</TableCell>
										<TableCell>{item.area}</TableCell>
										<TableCell>{item.planted}</TableCell>
										<TableCell>{item.harvested}</TableCell>
										<TableCell>
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

export default PlantedAreaModal
