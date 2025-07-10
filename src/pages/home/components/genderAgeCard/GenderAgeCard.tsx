import { Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import YearMenu from '../../../../components/common/YearMenu/YearMenu'
import { useGetPopulationAgeGender } from '../../../../hooks/useHome'

function GenderAgeCard() {
	const [selectedYear, setSelectedYear] = useState<number>(2025)
	const theme = useTheme()

	const { data } = useGetPopulationAgeGender()

	const chartData =
		data?.[String(selectedYear)]?.map(item => ({
			name: item.age_group.replace(/^до\s*/, '> ').replace(/^от\s*/, '< '),
			men: item.mens,
			women: item.womens,
		})) ?? []

	const totalMen = chartData.reduce((sum, item) => sum + item.men, 0)
	const totalWomen = chartData.reduce((sum, item) => sum + item.women, 0)

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

			<ResponsiveContainer height={130}>
				<BarChart data={chartData} barCategoryGap={'45%'}>
					<XAxis dataKey='name' tickLine={false} axisLine={false} />
					<YAxis hide />
					<Tooltip
						cursor={{ fill: theme.palette.action.hover }}
						formatter={(value: number, name: string) => [
							value.toLocaleString(),
							name === 'men' ? 'Мужчины' : 'Женщины',
						]}
					/>

					{/* Женщины */}

					<Bar dataKey='women' stackId='a' fill='#D50000' radius={20}>
						{/* <LabelList
							content={({ x = 0, y = 0, width = 0, index, value }) => {
								const women = chartData[index as number]?.women ?? 0
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
						/> */}
					</Bar>

					{/* Мужчины */}
					<Bar dataKey='men' stackId='a' fill='#2196F3' radius={20}>
						{/* <LabelList
							content={({ x = 0, y = 0, width = 0, index }) => {
								const label = chartData[index as number]?.men ?? 0

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
						/> */}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
			<Box mt={1} display='flex' justifyContent='center' gap={4}>
				<Box display='flex' alignItems='center' gap={1}>
					<Box width={12} height={12} borderRadius='50%' bgcolor='#2196F3' />
					<Typography variant='caption' fontWeight='bold'>
						Мужчины: {totalMen.toLocaleString()}
					</Typography>
				</Box>
				<Box display='flex' alignItems='center' gap={1}>
					<Box width={12} height={12} borderRadius='50%' bgcolor='#D50000' />
					<Typography variant='caption' fontWeight='bold'>
						Женщины: {totalWomen.toLocaleString()}
					</Typography>
				</Box>
			</Box>
		</Box>
	)
}

export default GenderAgeCard
