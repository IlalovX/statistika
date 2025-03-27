import { Box, Typography, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
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
				Урожай: {value}т
			</tspan>
			<tspan x={x} dy='15'>
				Прибыль: {profit}$
			</tspan>
		</text>
	)
}

function XojalikChartCard() {
	const theme = useTheme()

	const { data: plants } = useQuery({
		queryKey: ['plants'],
		queryFn: async () => {
			const res = await fetch(
				'/db/plants/awıl_xojalıq_ónimleri_mlrd_swmda_aymawlar_boyınsha.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
		select: data => {
			const regionData =
				data?.awıl_xojalıq_ónimleri_mlrd_swmda_aymawlar_boyınsha?.[
					'Qaraqalpaqstan Respublikası'
				] || {}

			return Object.entries(regionData)
				.map(([year, harvest]) => ({
					year,
					harvest: typeof harvest === 'number' ? harvest : Number(harvest) || 0,
					profit: 0,
				}))
				.slice(-6)
		},
	})

	return (
		<Box
			className='shadow-xl rounded-2xl my-5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Box className='flex gap-10 m-5'>
				<Box>
					<p className='text-gray-400'>Общее количество собранных урожаев</p>
					<Typography variant='h6'>0</Typography>
					<p className='text-gray-400'>
						<span className='text-green-500 text-xl'>0%</span> за последний
						месяц
					</p>
				</Box>
				<Box>
					<p className='text-gray-400'>Общий прибыль от собранных урожаев</p>
					<Typography variant='h6' className='text-[#355CBF]'>
						0 $
					</Typography>
					<p className='text-gray-400'>
						<span className='text-green-500 text-xl'>0%</span> за последний
						месяц
					</p>
				</Box>
			</Box>
			<ResponsiveContainer width='100%' height={400}>
				<ComposedChart
					data={plants || []}
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
						padding={{ left: 60, right: 20 }}
					/>
					<YAxis type='number' domain={[0, 'dataMax+5000']} />

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
						label={<CustomizedLabel data={plants ?? []} />}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default XojalikChartCard
