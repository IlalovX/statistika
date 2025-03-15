import { Box, Stack, Typography, useTheme } from '@mui/material'
import { SparkLineChart } from '@mui/x-charts'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ThemeText from '../themeText/ThemeText'

function HomePopulationCard() {
	const theme = useTheme()
	const [chartData, setChartData] = useState<number[]>([])
	const [lastKey, setLastKey] = useState<string | null>(null)

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
			const qqPopulation = data['Qaraqalpaqstan Respublikası']
			const keys = Object.keys(qqPopulation).sort()
			const latestKey = keys[keys.length - 1]

			setLastKey(latestKey)

			const validData = keys
				.slice(-4)
				.map(year => {
					const rawValue = qqPopulation[year]
					if (!rawValue) return 0

					// Убираем пробелы, заменяем запятую на точку и конвертируем в число
					const numericValue = Number(
						rawValue.replace(/\s/g, '').replace(',', '.')
					)

					return isNaN(numericValue) ? 0 : numericValue
				})
				.filter(value => value > 0) // Исключаем некорректные значения

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
			<ThemeText text='Население' variant='h6' />
			<p className='text-gray-400'>за {lastKey ?? '...'} г</p>
			<Stack direction='row' sx={{ width: '100%', height: '77px' }}>
				<Box sx={{ flexGrow: 1 }}>
					<SparkLineChart
						data={chartData}
						height={77}
						showHighlight
						showTooltip
						valueFormatter={value => `${value} тыс`}
					/>
				</Box>
			</Stack>
			<div className='flex items-center justify-between'>
				<Typography variant='body1'>
					{lastKey && data
						? `${data['Qaraqalpaqstan Respublikası'][lastKey]} млн`
						: '...'}{' '}
					<br /> человек
				</Typography>
				<span className='text-green-500'>+11,47%</span>
			</div>
		</Box>
	)
}

export default HomePopulationCard
