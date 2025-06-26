'use client'

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
import { YearSelect } from '../../../../components/common/YearSelect/YearSelect'
import { currentYear } from '../../../../const/monthsOfYear'
import { useClientPlacement } from '../../../../hooks/useAgriculture'
import PlantedAreaModal from './PlantedAreaModal'

export default function PlantedArea() {
	const theme = useTheme()
	const [year, setYear] = useState(currentYear)
	const { data: placement = [] } = useClientPlacement(year)

	return (
		<Box
			className='p-5 rounded-xl shadow-md relative flex flex-col '
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center'>
				<Typography variant='h4' className='font-semibold text-gray-700'>
					Показатели
				</Typography>
				<div>
					<YearSelect value={year} onChange={setYear} />
				</div>
			</div>
			<div className='flex flex-col justify-between h-full'>
				<TableContainer className='mt-4 h-fit '>
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
									<TableCell>{item.percent.value}%</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<PlantedAreaModal placement={placement} />
			</div>
		</Box>
	)
}
