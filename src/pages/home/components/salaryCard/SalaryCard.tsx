import { Box, Typography, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import {
	Area,
	AreaChart,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'
import YearMenu from '../../../../components/common/YearMenu/YearMenu'
import { useGetSalary } from '../../../../hooks/useHome'

const defaultQuarters = ['Q1', 'Q2', 'Q3', 'Q4']

function SalaryCard() {
	const [selectedYear, setSelectedYear] = useState<number>(2025)
	const { data } = useGetSalary()
	const theme = useTheme()
	const averageSalary = data?.average?.[selectedYear] ?? 0

	const quarterlyValues = data?.values?.[selectedYear]
	const previousYearValues = data?.values?.[selectedYear - 1]

	const chartData = defaultQuarters.map(q => ({
		name: q,
		salary: quarterlyValues?.[q as keyof typeof quarterlyValues] ?? 0,
	}))

	const percentChange = useMemo(() => {
		if (!previousYearValues) return null
		const prevAvg = data?.average?.[selectedYear - 1] ?? 0
		if (!prevAvg) return null
		const change = ((averageSalary - prevAvg) / prevAvg) * 100
		return change
	}, [averageSalary, selectedYear, data])

	const percentFormatted =
		percentChange !== null
			? `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`
			: ''

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5 flex flex-col justify-between'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div>
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

				<div>
					<Typography variant='h6' className='!font-bold'>
						{averageSalary.toLocaleString('ru-RU')} сум
						{percentChange !== null && (
							<Typography
								component='span'
								variant='body2'
								sx={{
									ml: 1,
									color: percentChange > 0 ? 'green' : 'red',
									fontWeight: 'bold',
								}}
							>
								({percentFormatted})
							</Typography>
						)}
					</Typography>
					<Typography
						variant='body2'
						className=' font-semibold text-neutral-500'
					>
						Годовой
					</Typography>
				</div>
			</div>

			<ResponsiveContainer width='100%' height={120}>
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
					<YAxis
						width={0}
						ticks={[]}
						tickSize={0}
						tickCount={0}
						tickMargin={0}
						tickLine={false}
						axisLine={false}
						domain={['dataMin - 100000', 'dataMax + 100000']}
					/>
					<Area
						type='monotone'
						dataKey='salary'
						stroke='#2BE007'
						fill='url(#salaryGradient)'
						strokeWidth={2}
						dot={{ r: 4, fill: '#2BE007' }}
					>
						<LabelList
							dataKey='salary'
							position='top'
							content={({ x, y, value }) => (
								<text
									x={x}
									y={((y as number) ?? 0) - 10}
									textAnchor='middle'
									fill={theme.palette.mode === 'light' ? '#2BE007' : '#ffffff'}
									fontSize={14}
								>
									{((value as number) / 1000).toLocaleString('ru-RU', {
										minimumFractionDigits: 1,
										maximumFractionDigits: 1,
									})}
								</text>
							)}
						/>
					</Area>
				</AreaChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default SalaryCard
