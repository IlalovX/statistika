import { Agriculture } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
	useTheme,
} from '@mui/material'
import ModalPlantedTable from '../../modalPlantedTable/ModalPlantedTable'

const data = [
	{ name: 'Рис', area: '0 га', yield: '0 т', percentage: 0 },
	{ name: 'Картошка', area: '0 га', yield: '0 т', percentage: 0 },
	{ name: 'Хлопок', area: '0 га', yield: '0 т', percentage: 0 },
	{ name: 'Полынь', area: '0 га', yield: '0 т', percentage: 0 },
]

export default function AgricultureTable() {
	const theme = useTheme()

	return (
		<Box
			className='p-5  rounded-xl shadow-md'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='h6' className='font-semibold text-gray-700'>
				Посадено <span className='text-blue-600 font-bold'>0 га</span>
			</Typography>

			<TableContainer className='mt-4'>
				<Table>
					<TableBody>
						{data.map((item, index) => (
							<TableRow key={index}>
								<TableCell>
									<Typography className='flex items-center gap-2  font-medium'>
										<Avatar sx={{ width: 24, height: 24 }}>
											<Agriculture fontSize='small' />
										</Avatar>
										{item.name}
									</Typography>
								</TableCell>

								<TableCell sx={{ color: 'gray.600' }}>{item.area}</TableCell>

								<TableCell sx={{ color: 'gray.600' }}>{item.yield}</TableCell>

								<TableCell sx={{ color: 'gray.600' }}>
									{item.percentage}%
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Box className='mt-3 text-right'>
				<Typography
					variant='body2'
					className='text-blue-600 font-medium cursor-pointer hover:underline'
				>
					<ModalPlantedTable />
				</Typography>
			</Box>
		</Box>
	)
}
