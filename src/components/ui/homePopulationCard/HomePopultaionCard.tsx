import { Box, Stack, Typography, useTheme } from '@mui/material'
import { SparkLineChart } from '@mui/x-charts'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import YearDropdown from '../../YearDropdown'

// function LineGraph({ data }: { data: any }) {
// 	return (
// 		<ResponsiveChartContainer
// 			height={70}
// 			dataset={data}
// 			series={[{ dataKey: '', valueFormatter: v => v.toString(),type }]}
// 			sx={{
// 				backgroundImage:
// 					'linear-gradient(transparent 95%, #ddd 5%), linear-gradient(90deg, transparent 95%, #ddd 5%)',
// 				backgroundSize: '20px 20px',
// 			}}
// 		>
// 			<LinePlot strokeWidth={2} stroke='#3b82f6' />
// 			<MarkPlot />
// 		</ResponsiveChartContainer>
// 	)
// }

function HomePopulationCard() {
	const theme = useTheme()
	const [chartData, setChartData] = useState<number[]>([])
	const [lastKey, setLastKey] = useState<string | null>(null)
	const [qqPopulation, setQQPopulation] = useState<Record<
		string,
		string
	> | null>(null)

	const { data } = useQuery({
		queryKey: ['population'],
		queryFn: async () => {
			const res = await fetch('/db/population/population.json')
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	useEffect(() => {
		if (data && data['Qaraqalpaqstan Respublikası']) {
			const populationData = data['Qaraqalpaqstan Respublikası']
			setQQPopulation(populationData)

			const keys = Object.keys(populationData).sort()
			if (keys.length === 0) return

			const latestKey = keys[keys.length - 1]
			setLastKey(latestKey)

			const validData = keys
				.slice(-4)
				.map(year => {
					const rawValue = populationData[year]
					if (!rawValue) return 0

					const numericValue = Number(
						rawValue.replace(/\s/g, '').replace(',', '.')
					)

					return isNaN(numericValue) ? 0 : numericValue
				})
				.filter(value => value > 0)

			setChartData(validData)
		}
	}, [data])

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='h6' fontWeight='bold'>
				Население
			</Typography>
			<YearDropdown />
			<Stack direction='row' sx={{ width: '100%', height: '70px' }}>
				<Box sx={{ flexGrow: 1 }}>
					<SparkLineChart
						data={chartData}
						height={70}
						showHighlight
						showTooltip
						valueFormatter={value => `${value} тыс`}
					/>
				</Box>
			</Stack>
			{/* <LineGraph data={chartData} /> */}
			<div>
				<div className='flex items-center justify-between'>
					{qqPopulation
						? Object.keys(qqPopulation)
								.slice(-4)
								.map(item => <Typography variant='body2'>{item}</Typography>)
						: '...'}
				</div>
				<div className='flex items-center justify-between'>
					<Typography variant='body2'>
						{lastKey && qqPopulation ? `${qqPopulation[lastKey]} млн` : '...'}{' '}
						<br /> человек
					</Typography>
					<span className='text-green-500'>+11,47%</span>
				</div>
			</div>
		</Box>
	)
}

export default HomePopulationCard
