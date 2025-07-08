import { Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import {
	Bar,
	BarChart,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'
import YearMenu from '../../../../components/common/YearMenu/YearMenu'
import { formatCompactNumber } from '../../../../utils/formatCompactNumber'

// 🧪 Мок-данные с разбивкой на мужчин и женщин
const mockData = [
	{ name: 'до 18', men: 750000, women: 700000 },
	{ name: 'до 30', men: 800000, women: 750000 },
	{ name: 'до 55', men: 850000, women: 800000 },
	{ name: 'от 60', men: 650000, women: 700000 },
]

function GenderAgeCard() {
	const [selectedYear, setSelectedYear] = useState<number>(2025)
	const theme = useTheme()

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5 '
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center gap-3'>
				<Typography variant='body2' fontWeight='bold'>
					Аҳоли сони ёш ва жинс кесимида
				</Typography>

				<YearMenu
					onChange={setSelectedYear}
					selectedYear={selectedYear}
					className='self-start'
				/>
			</div>

			<ResponsiveContainer height={160}>
				<BarChart data={mockData} barCategoryGap={'45%'}>
					<XAxis dataKey='name' tickLine={false} axisLine={false} />
					<YAxis hide />
					{/* Женщины */}
					<Bar dataKey='women' stackId='a' fill='#D50000' radius={20}>
						<LabelList
							content={({ x = 0, y = 0, width = 0, index, value }) => {
								const women = mockData[index as number].women
								const label = women.toLocaleString()
								const fontSize = 12
								const padding = 4

								const textWidth = label.length * fontSize * 0.6
								const rectWidth = textWidth + padding * 2
								const rectHeight = fontSize + padding

								const cx = +x + +width / 2
								const cy = +y + 8 // внутри бара

								return (
									<g>
										<rect
											x={cx - rectWidth / 2}
											y={cy - rectHeight / 2}
											width={rectWidth}
											height={rectHeight}
											fill={theme.palette.background.default}
											opacity={0.9}
										/>
										<text
											x={cx}
											y={cy}
											fontSize={12}
											fill={
												theme.palette.mode === 'light' ? '#D50000' : 'white'
											}
											textAnchor='middle'
											dominantBaseline='middle'
										>
											{formatCompactNumber(+(value as number))}
										</text>
									</g>
								)
							}}
						/>
					</Bar>

					{/* Мужчины */}
					<Bar dataKey='men' stackId='a' fill='#2196F3' radius={20}>
						<LabelList
							content={({ x = 0, y = 0, width = 0, index }) => {
								const label = mockData[index as number].men

								const cx = +x + +width / 2
								const cy = +y - 8 // над баром

								return (
									<g>
										<text
											x={cx}
											y={cy}
											fontSize={12}
											fill={
												theme.palette.mode === 'light' ? '#355CBF' : 'white'
											}
											textAnchor='middle'
											dominantBaseline='middle'
										>
											{formatCompactNumber(+label)}
										</text>
									</g>
								)
							}}
						/>
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default GenderAgeCard
