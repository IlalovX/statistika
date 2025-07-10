import { Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts'
import YearMenu from '../../../../components/common/YearMenu/YearMenu'
import { useAgeCategoryPopulationStat } from '../../../../hooks/useAgeCategoryPopulationStat'

interface AgeDataItem {
	name: string
	uv: number
}

function HomeAgesCard() {
	const [selectedYear, setSelectedYear] = useState<number>(2025)
	const theme = useTheme()

	const { data, isLoading } = useAgeCategoryPopulationStat(selectedYear)

	const chartData: AgeDataItem[] = data.map(d => ({
		name: d.category,
		uv: d.total,
	}))

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='body2' fontWeight='bold'>
				Аҳоли сони ёш кесимида
			</Typography>
			<div>
				<YearMenu
					onChange={setSelectedYear}
					selectedYear={selectedYear}
					className='self-start'
				/>
			</div>

			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<ResponsiveContainer height={135}>
					<BarChart
						data={chartData}
						margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
						barCategoryGap={'50%'}
					>
						<XAxis dataKey='name' tickLine={false} axisLine={false} />
						<Bar
							dataKey='uv'
							label={{
								position: 'top',
								formatter: (value: number) => `${(value / 1000).toFixed(1)}`,
							}}
						>
							{chartData.map((entry, index) => (
								<Cell
									key={`cell-${index}-${entry.name}`}
									fill='#7367F0'
									radius={20}
									width={10}
								/>
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			)}
		</Box>
	)
}

export default HomeAgesCard
