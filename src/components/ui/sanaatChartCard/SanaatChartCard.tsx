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
	data: { year: string; products: number; profit: number }[]
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
				Продукты: {value}
			</tspan>
			<tspan x={x} dy='15'>
				Прибыль: {profit}$
			</tspan>
		</text>
	)
}
function SanaatChartCard() {
	const data = [
		{ year: '2020', products: 700, profit: 100 },
		{ year: '2021', products: 2000, profit: 150 },
		{ year: '2022', products: 1000, profit: 200 },
		{ year: '2023', products: 2000, profit: 250 },
		{ year: '2024', products: 2500, profit: 300 },
		{ year: '2025', products: 1800, profit: 180 },
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
				start='Общее количество Продукция'
				end='Общее прибыль  продукции'
			/>
			<ResponsiveContainer width='100%' height={300}>
				<ComposedChart
					data={data}
					margin={{ top: 30, right: 55, left: 0, bottom: 10 }}
				>
					<defs>
						<linearGradient id='colorproducts' x1='0' y1='0' x2='0' y2='1'>
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
						dataKey='products'
						stroke='#8884d8'
						fill='url(#colorproducts)'
					/>

					<Line
						strokeWidth={3}
						type='linear'
						dataKey='products'
						stroke='#00BAD1'
						dot={{ r: 5 }}
						label={<CustomizedLabel data={data} />}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default SanaatChartCard
