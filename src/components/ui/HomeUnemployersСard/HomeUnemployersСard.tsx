import { Box, Stack, useTheme } from '@mui/material'
import { SparkLineChart } from '@mui/x-charts'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ThemeText from '../themeText/ThemeText'

export default function HomeUnemployersCard() {
	const theme = useTheme()
	const [chartData, setChartData] = useState([1, 2, 3, 4]) 

	const { data } = useQuery({
		queryKey: ['unemployees'],
		queryFn: async () => {
			const res = await fetch('/db/unemployers/unemployers.json')
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	useEffect(() => {
		if (data?.data?.[1]) {
			setChartData([
				data.data[1]['2020'],
				data.data[1]['2021'],
				data.data[1]['2022'],
				data.data[1]['2023'],
			])
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
			<ThemeText text='Безработные' variant='h6' />
			<p className='text-gray-400'>250 человек</p>
			<Stack direction='row' sx={{ width: '100%', height: '77px' }}>
				<Box sx={{ flexGrow: 1 }}>
					<SparkLineChart
						data={chartData}
						height={77}
						showHighlight
						showTooltip
					/>
				</Box>
			</Stack>
			<div className='flex items-center justify-between text-gray-400 gap-1 text-sm'>
				<span>2020</span>
				<span>2021</span>
				<span>2022</span>
				<span>2023</span>
			</div>
		</Box>
	)
}
