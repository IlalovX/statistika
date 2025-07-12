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
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import YearMenu from '../../../../components/common/YearMenu/YearMenu'
import { useGetStatProduct } from '../../../../hooks/useAgriculture'
import PlantedAreaModal from './PlantedAreaModal'

export default function PlantedArea() {
	const theme = useTheme()
	const [year, setYear] = useState(2024)
	// const { data: placement = [] } = useClientPlacement(year)
	const { data: harvested = [] } = useGetStatProduct()

	return (
		<Box
			className='p-5 rounded-xl shadow-md relative flex flex-col '
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center'>
				<Typography variant='h4' className='!font-bold text-gray-700'>
					Кўрсаткичлар
				</Typography>
				<div>
					<YearMenu
						selectedYear={year}
						onChange={setYear}
						className='!text-xl'
						color={theme.palette.primary.main}
					/>
				</div>
			</div>
			<div className='flex flex-col justify-between h-full'>
				<TableContainer className='mt-4 h-fit '>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 'bold' }}></TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Майдон</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Экилди</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Ҳосил</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Фоизда</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{harvested?.slice(0, 5).map((item, index) => (
								<TableRow key={index}>
									<TableCell>
										<Typography
											className='flex items-center gap-2'
											fontSize={14}
										>
											<Avatar sx={{ width: 24, height: 24 }}>
												<Agriculture fontSize='small' />
											</Avatar>
											{item.metadata}
										</Typography>
									</TableCell>
									<TableCell sx={{ fontSize: 16 }}>{0}</TableCell>
									<TableCell sx={{ fontSize: 16 }}>{0}</TableCell>
									<TableCell sx={{ fontSize: 16 }}>
										{item?.values[year]} т
									</TableCell>
									<TableCell sx={{ fontSize: 16 }}>{0}%</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<PlantedAreaModal placement={harvested} year={year} />
			</div>
		</Box>
	)
}
