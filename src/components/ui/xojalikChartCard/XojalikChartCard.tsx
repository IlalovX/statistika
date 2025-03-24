import { Box, useTheme } from '@mui/material'
import {
	Area,
	ComposedChart,
	LabelProps,
	Line,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'
import { CustomizedAxisTick } from '../../ChartComponents'
import StatsHeader from '../chartStatsHeader/ChartStatsHeader'

interface CustomizedLabelProps extends LabelProps {
	data: { year: string; harvest: number; profit: number }[]
}

const CustomizedLabel: React.FC<CustomizedLabelProps> = props => {
	const { x, y, value, index, data } = props

	const profit = index !== undefined && data[index] ? data[index].profit : 0

	return (
		<text
			x={x}
			y={y}
			dy={-15}
			textAnchor='middle'
			fill='#00BAD1'
			fontSize={14}
			fontWeight='bold'
		>
			<tspan x={x} dy='-40'>
				Урожай: {value}
			</tspan>
			<tspan x={x} dy='15'>
				Прибыль: {profit}$
			</tspan>
		</text>
	)
}
function XojalikChartCard() {
	const data = [
		{ year: '2020', harvest: 700, profit: 100 },
		{ year: '2021', harvest: 2000, profit: 150 },
		{ year: '2022', harvest: 1000, profit: 200 },
		{ year: '2023', harvest: 2000, profit: 250 },
		{ year: '2024', harvest: 2500, profit: 300 },
		{ year: '2025', harvest: 1800, profit: 180 },
	]

	const theme = useTheme()
	return (
		<Box
			className='shadow-xl rounded-2xl  my-5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<StatsHeader
				start='Общее количество собранных урожаев'
				end='Общий прибыль от собранных урожаев'
			/>
			<ResponsiveContainer width='100%' height={300}>
				<ComposedChart
					data={data}
					margin={{ top: 30, right: 55, left: 0, bottom: 10 }}
				>
					<defs>
						<linearGradient id='colorharvest' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0%' stopColor='#8884d8' stopOpacity={0.5} />
							<stop offset='100%' stopColor='#8884d8' stopOpacity={0} />
						</linearGradient>
					</defs>

					<XAxis
						dataKey='year'
						tick={<CustomizedAxisTick />}
						type='category'
						padding={{ left: 55, right: 20 }}
					/>
					<YAxis type='number' domain={[0, 'dataMax']} />

					<Area
						type='linear'
						dataKey='harvest'
						stroke='#8884d8'
						fill='url(#colorharvest)'
					/>

					<Line
						strokeWidth={3}
						type='linear'
						dataKey='harvest'
						stroke='#00BAD1'
						dot={{ r: 5 }}
						label={<CustomizedLabel data={data} />}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default XojalikChartCard
