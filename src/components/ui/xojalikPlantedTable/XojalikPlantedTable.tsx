import { Agriculture } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useTheme,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import ModalPlantedTable from '../modalPlantedTable/ModalPlantedTable'

export default function XojalikPlantedTable() {
	const theme = useTheme()

	const { data: accommodation } = useQuery({
		queryKey: ['accommodation'],
		queryFn: async () => {
			const res = await fetch(
				'/db/others/bárshe_turlerinde_islep_shıģılģan_dıyqanshılıq_ònimleri_haqqında.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	const processedData = useMemo(() => {
		if (!accommodation) return []
		return Object.keys(accommodation)
			.filter(key => key.toLowerCase() !== 'total')
			.map(key => ({
				name: key,
				area: 0,
				planted: 0,
				yield: accommodation[key][2024] || 0,
				percentage: 0,
			}))
	}, [accommodation])

	return (
		<Box
			className='p-5 rounded-xl shadow-md relative'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='h4' className='font-semibold text-gray-700'>
				Показатели
			</Typography>
			<TableContainer className='mt-4'>
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
						{processedData.slice(0, 4).map((item, index) => (
							<TableRow key={index}>
								<TableCell>
									<Typography className='flex items-center gap-2 font-medium'>
										<Avatar sx={{ width: 24, height: 24 }}>
											<Agriculture fontSize='small' />
										</Avatar>
										{item.name}
									</Typography>
								</TableCell>
								<TableCell>{item.area}</TableCell>
								<TableCell>{item.planted}</TableCell>
								<TableCell>{item.yield}</TableCell>
								<TableCell>{item.percentage}</TableCell>
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
					<ModalPlantedTable data={accommodation} />
				</Typography>
			</Box>
		</Box>
	)
}
