import { Box, Typography, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts'
import YearDropdown from '../../../YearDropdown'

interface AgeDataItem {
	name: string
	uv: number
}

function HomeAgesCard() {
	const theme = useTheme()
	const [chartData, setChartData] = useState<AgeDataItem[]>([])

	const { data: ages } = useQuery({
		queryKey: ['ages'],
		queryFn: async () => {
			const res = await fetch(
				'/db/ages/turaqlı_xalıq_sanı_jas_kategoriyalar_boyınsha_tek_qaralpaqstan.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	useEffect(() => {
		if (ages) {
			const ageStats = ages['Qaraqalpaqstan Respublikası']['2024']
			if (!ageStats) return

			const formattedData = Object.entries(ageStats)
				.filter(([key]) => key !== 'total') // Убираем "total"
				.map(([key, value]) => ({
					name: key === 'up to 80' ? 'за 80' : `до ${key}`,
					uv: Number(value),
				}))

			setChartData(formattedData)
		}
	}, [ages])

	if (chartData.length === 0) return <p>Загрузка...</p>

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
			<ResponsiveContainer height={135}>
				<BarChart
					data={chartData}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<XAxis dataKey='name' tickLine={false} axisLine={false} />
					<Bar dataKey='uv' label={{ position: 'top' }}>
						{chartData.map((entry, index) => (
							<Cell
								key={`cell-${index}-${entry}`}
								fill='#7367F0'
								radius={20}
								width={10}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default HomeAgesCard
