import { Box, Typography, useTheme } from '@mui/material'
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

interface CustomizedLabelProps extends LabelProps {
	data: { year: string; guests: number; profit: number }[]
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
				{/* Туристы: {value} */}
				Туристы: 0
			</tspan>
			<tspan x={x} dy='15'>
				{/* Прибыль: {profit}$ */}
				Прибыль: 0$
			</tspan>
		</text>
	)
}
function TourismChartCard() {
	const data = [
		{ year: '2020', guests: 700, profit: 100 },
		{ year: '2021', guests: 2000, profit: 150 },
		{ year: '2022', guests: 1000, profit: 200 },
		{ year: '2023', guests: 2000, profit: 250 },
		{ year: '2024', guests: 2500, profit: 300 },
		{ year: '2025', guests: 1800, profit: 180 },
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
			<header className='flex justify-between items-start m-10'>
				<Box className='flex gap-10'>
					<Box>
						<p className='text-gray-400'>Общее количество Туристов</p>
						<Typography variant='h6'>0</Typography>
						<p className='text-gray-400'>
							<span className='text-green-500 text-xl'>0%</span> за последний
							месяц
						</p>
					</Box>
					<Box>
						<p className='text-gray-400'>Общее прибыль от Туристов</p>
						<Typography variant='h6' className='text-[#355CBF]'>
							0 $
						</Typography>
						<p className='text-gray-400'>
							<span className='text-green-500 text-xl'>0%</span> за последний
							месяц
						</p>
					</Box>
				</Box>
			</header>
			<ResponsiveContainer width='100%' height={300}>
				<ComposedChart
					data={data}
					margin={{ top: 30, right: 55, left: 0, bottom: 10 }}
				>
					<defs>
						<linearGradient id='colorguests' x1='0' y1='0' x2='0' y2='1'>
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
					<YAxis type='number' domain={[0, 'dataMax+500']} />

					<Area
						type='linear'
						dataKey='guests'
						stroke='#8884d8'
						fill='url(#colorguests)'
					/>

					<Line
						strokeWidth={3}
						type='linear'
						dataKey='guests'
						stroke='#00BAD1'
						dot={{ r: 5 }}
						label={<CustomizedLabel data={data} />}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default TourismChartCard
