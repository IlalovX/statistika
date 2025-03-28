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
	data: { year: string; harvest?: number; profit?: number }[]
}

const formatNumber = (num: number): string => {
	return (
		(num / 1000).toLocaleString('ru-RU', {
			maximumFractionDigits: 1,
		}) + ' тыс.'
	)
}

const formatCurrency = (num: number): string => {
	return (
		num.toLocaleString('ru-RU', {
			minimumFractionDigits: 1,
			maximumFractionDigits: 1,
		}) + ' млрд сум'
	)
}

const CustomizedLabel: React.FC<CustomizedLabelProps> = props => {
	const { x, y, value, index, data } = props

	const profit = index !== undefined && data[index] ? data[index].profit : 0
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
				Урожай: {formatNumber(value as number)} т
			</tspan>
			<tspan x={x} dy={isLast ? '20' : '15'}>
				Общий доход: {formatCurrency(profit as number)}
			</tspan>
		</text>
	)
}

function XojalikChartCard() {
	const theme = useTheme()

	const { data: harvestData } = useQuery({
		queryKey: ['harvest'],
		queryFn: async () => {
			const res = await fetch(
				'/db/others/bárshe_turlerinde_islep_shıģılģan_dıyqanshılıq_ònimleri_haqqında.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
		select: data => {
			const harvest = data?.['total'] || {}

			return Object.entries(harvest).map(([year, value]) => ({
				year,
				harvest: typeof value === 'number' ? value : Number(value) || 0,
			}))
		},
	})

	const { data: profitData } = useQuery({
		queryKey: ['profit'],
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

			return Object.entries(regionData).map(([year, value]) => ({
				year,
				profit: typeof value === 'number' ? value : Number(value) || 0,
			}))
		},
	})

	const combinedData = (harvestData || []).reduce(
		(acc, item) => {
			acc[item.year] = { year: item.year, harvest: item.harvest }
			return acc
		},
		{} as Record<string, { year: string; harvest?: number; profit?: number }>
	)

	profitData?.forEach(item => {
		if (combinedData[item.year]) {
			combinedData[item.year].profit = item.profit
		} else {
			combinedData[item.year] = { year: item.year, profit: item.profit }
		}
	})

	const finalChartData = Object.values(combinedData)
		.sort((a, b) => Number(a.year) - Number(b.year))
		.slice(-6)

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
					<Typography variant='h6'>
						{profitData &&
							formatNumber(profitData[profitData.length - 1].profit)}{' '}
						т
					</Typography>
					<p className='text-gray-400'>
						<span className='text-green-500 text-xl'>0%</span> за последний
						месяц
					</p>
				</Box>

				<Box>
					<p className='text-gray-400'>Общий доход от собранных урожаев</p>
					<Typography variant='h6' className='text-[#355CBF]'>
						{formatCurrency(
							finalChartData.reduce((sum, d) => sum + (d.profit || 0), 0)
						)}
					</Typography>
					<p className='text-gray-400'>
						<span className='text-green-500 text-xl'>0%</span> за последний
						месяц
					</p>
				</Box>
			</Box>
			<ResponsiveContainer width='100%' height={400}>
				<ComposedChart
					data={finalChartData}
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
						padding={{ left: 10, right: 10 }}
					/>
					<YAxis
						type='number'
						fontSize={11}
						domain={[0, (dataMax: number) => dataMax * 1.5]}
						tickFormatter={value => `${Math.round(value / 1000)}тыс.`}
					/>

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
						label={<CustomizedLabel data={finalChartData} />}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default XojalikChartCard
