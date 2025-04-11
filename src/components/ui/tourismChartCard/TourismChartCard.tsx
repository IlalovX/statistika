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
import { GetTouristData } from '../../../types/queries'
import { CustomizedAxisTick } from '../../ChartComponents'

interface ChartDataType {
	month: string
	total: number
	ishkiValue: number
	sirtqiValue: number
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
			<tspan x={x} dy={isLast ? '-50' : '-40'}>
				Внешний: {item.sirtqiValue}
			</tspan>
			<tspan x={x} dy={isLast ? '20' : '15'}>
				Внутренний: {item.ishkiValue}
			</tspan>
		</text>
	)
}

function TourismChartCard({
	ishki,
	sirtqi,
}: {
	ishki: GetTouristData
	sirtqi: GetTouristData
}) {
	const theme = useTheme()

	const years = [
		...new Set([...Object.keys(ishki || {}), ...Object.keys(sirtqi || {})]),
	].sort()

	const latestYear = years[years.length - 1]

	const months = Object.keys({
		...(ishki?.[latestYear] || {}),
		...(sirtqi?.[latestYear] || {}),
	})

	const data: ChartDataType[] = months.map(month => {
		const ishkiValue = ishki?.[latestYear]?.[month] ?? 0
		const sirtqiValue = sirtqi?.[latestYear]?.[month] ?? 0

		return {
			month,
			total: ishkiValue + sirtqiValue,
			ishkiValue,
			sirtqiValue,
		}
	})

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
						<p className='text-gray-400'>Общее количество Туристов</p>
						<Typography variant='h6'>
							{data.reduce((sum, d) => sum + d.total, 0)}
						</Typography>
						<p className='text-gray-400'>
							<span className='text-green-500 text-xl'>0%</span> за последний
							год
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
			<ResponsiveContainer width='100%' height={400}>
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
						dataKey='month'
						tick={<CustomizedAxisTick />}
						type='category'
					/>
					<YAxis
						type='number'
						domain={[
							0,
							(dataMax: number) =>
								Math.round((dataMax + dataMax / 4) / 1000) * 1000,
						]}
					/>

					<Area
						type='linear'
						dataKey='total'
						stroke='#8884d8'
						fill='url(#colorguests)'
					/>

					<Line
						strokeWidth={3}
						type='linear'
						dataKey='total'
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

export default TourismChartCard
