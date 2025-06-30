import { Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import {
	Area,
	ComposedChart,
	LabelProps,
	Line,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'
import { CustomizedAxisTick } from '../../../components/ChartComponents'
import { YearSelect } from '../../../components/common/YearSelect/YearSelect'
import { currentYear, MONTHS } from '../../../const/monthsOfYear'
import { useYieldGraph } from '../../../hooks/useAgriculture'

interface ChartDataType {
	month: string
	yield: number
	profit: number
}

interface CustomizedLabelProps extends LabelProps {
	data: ChartDataType[]
	index: number
}

const CustomizedLabel: React.FC<CustomizedLabelProps> = ({
	x,
	y,
	index,
	data,
}) => {
	const item = data[index]
	const isLast = index === data.length - 1

	return (
		<text
			x={x}
			y={y}
			dy={-15}
			textAnchor={isLast ? 'end' : 'start'}
			fill='#00BAD1'
			fontSize={14}
			fontWeight='bold'
		>
			<tspan x={x} dy='-40'>
				Поля: {item.yield}
			</tspan>
			<tspan x={x} dy='20'>
				Прибыль: {item.profit}$
			</tspan>
		</text>
	)
}

interface Props {
	years: number[]
}

function ChartCard({ years }: Props) {
	const theme = useTheme()
	const [selectedYear, setSelectedYear] = useState<number>(currentYear)

	const { data: chart = [] } = useYieldGraph(selectedYear)

	const data = chart.map((item) => ({
		month: MONTHS.find((m) => m.value === item.month)?.label ?? 'Неизвестно',
		yield: item.yield.value,
		profit: item.profit.value,
	}))

	const totalYield = data.reduce((sum, item) => sum + item.yield, 0)
	const totalProfit = data.reduce((sum, item) => sum + item.profit, 0)

	return (
		<Box
			className='shadow-xl rounded-2xl my-5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<header className='flex justify-between items-start m-10'>
				<Box className='flex gap-10'>
					<Box>
						<p className='text-gray-400'>Общее количество продукции</p>
						<Typography variant='h6'>{totalYield}</Typography>
						<p className='text-gray-400'>
							<span className='text-green-500 text-xl'>0%</span> за последний
							месяц
						</p>
					</Box>
					<Box>
						<p className='text-gray-400'>Общая прибыль продукции</p>
						<Typography variant='h6' className='text-[#355CBF]'>
							{totalProfit} $
						</Typography>
						<p className='text-gray-400'>
							<span className='text-green-500 text-xl'>0%</span> за последний
							месяц
						</p>
					</Box>
				</Box>
				<YearSelect
					onChange={setSelectedYear}
					value={selectedYear}
					years={years}
				/>
			</header>

			<ResponsiveContainer width='100%' height={400}>
				<ComposedChart
					data={data}
					margin={{ top: 30, right: 20, left: 0, bottom: 10 }}
				>
					<defs>
						<linearGradient id='coloryield' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0%' stopColor='#8884d8' stopOpacity={0.5} />
							<stop offset='100%' stopColor='#8884d8' stopOpacity={0} />
						</linearGradient>
					</defs>

					<XAxis
						dataKey='month'
						tick={<CustomizedAxisTick />}
						type='category'
						padding={{ left: 55, right: 50 }}
					/>
					<YAxis
						type='number'
						domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.25)]}
					/>

					<Area
						type='linear'
						dataKey='profit'
						stroke='#8884d8'
						fill='url(#coloryield)'
					/>
					<Line
						strokeWidth={3}
						type='linear'
						dataKey='profit'
						stroke='#00BAD1'
						dot={{ r: 5 }}
						label={({ x, y, index }) => (
							<CustomizedLabel x={x!} y={y!} index={index!} data={data} />
						)}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default ChartCard
