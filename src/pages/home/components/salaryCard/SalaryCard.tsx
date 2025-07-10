import { Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import {
	Area,
	AreaChart,
	LabelList,
	ResponsiveContainer,
	XAxis,
} from 'recharts'
import YearMenu from '../../../../components/common/YearMenu/YearMenu'

// 🧪 Мок-данные по квартальной зарплате (в тыс. сум)
const chartData = [
	{ name: 'Q1', salary: 3200 },
	{ name: 'Q2', salary: 3400 },
	{ name: 'Q3', salary: 3550 },
	{ name: 'Q4', salary: 3700 },
]

function SalaryCard() {
	const [selectedYear, setSelectedYear] = useState<number>(2025)
	const theme = useTheme()

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5 flex flex-col justify-between'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center gap-3'>
				<Typography variant='body2' fontWeight='bold'>
					Ўртача ойлик(чораклик)
				</Typography>

				<YearMenu
					onChange={setSelectedYear}
					selectedYear={selectedYear}
					className='self-start'
				/>
			</div>

			<ResponsiveContainer width='100%' height={160}>
				<AreaChart
					data={chartData}
					margin={{ top: 20, right: 30, bottom: 10, left: 30 }}
				>
					<defs>
						<linearGradient id='salaryGradient' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0.3266' stopColor='#2BE007' stopOpacity={0.33} />
							<stop offset='1' stopColor='#FFFFFF' stopOpacity={0.01} />
						</linearGradient>
					</defs>

					<XAxis dataKey='name' style={{ fontSize: 12 }} />

					<Area
						type='monotone'
						dataKey='salary'
						stroke='#2BE007'
						fill='url(#salaryGradient)'
						strokeWidth={3}
						dot={{ r: 4, fill: '#2BE007' }}
					>
						<LabelList
							dataKey='salary'
							position='top'
							style={{
								fill: theme.palette.mode === 'light' ? '#2BE007' : '#ffffff',
								fontSize: 12,
							}}
							formatter={(value: number) => `${value}`}
						/>
					</Area>
				</AreaChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default SalaryCard
