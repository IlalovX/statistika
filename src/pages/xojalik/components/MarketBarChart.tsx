import { Box, Typography, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { YearSelect } from '../../../components/common/YearSelect/YearSelect'
import { currentYear, MONTHS } from '../../../const/monthsOfYear'
import { useMarket } from '../../../hooks/useAgriculture'

interface Props {
	years: number[]
}

function MarketBarChart({ years }: Props) {
	const theme = useTheme()
	const [year, setYear] = useState(currentYear)
	const { data: market = [] } = useMarket(year)

	const chartData = useMemo(() => {
		return MONTHS.map((month) => {
			const match = market.find((item) => item.month === month.value)
			const exportValue = match?.export ?? 0
			const localValue = match?.local_market ?? 0

			const bothZero = exportValue === 0 && localValue === 0

			return {
				name: month.label,
				export: bothZero ? undefined : exportValue,
				local_market: bothZero ? undefined : localValue,
			}
		})
	}, [market])

	return (
		<Box
			className='shadow-xl rounded-2xl p-4 mt-5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div className='flex justify-between items-center pr-5 mb-2'>
				<div className='flex gap-5'>
					<Typography variant='h6' sx={{ color: '#FF9F43' }}>
						Экспорт
					</Typography>
					<Typography variant='h6' sx={{ color: '#7367F0' }}>
						Внутренний рынок
					</Typography>
				</div>
				<YearSelect onChange={setYear} value={year} years={years} />
			</div>

			<ResponsiveContainer width='100%' height={300}>
				<BarChart
					data={chartData}
					barCategoryGap='30%'
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				>
					<XAxis dataKey='name' scale='band' tick={{ dy: 5 }} interval={0} />
					<YAxis />
					<Bar
						dataKey='export'
						fill='#FF9F43'
						barSize={20}
						name='Экспорт'
						label={{ position: 'top', fill: '#FF9F43', fontSize: 12 }}
					/>
					<Bar
						dataKey='local_market'
						fill='#7367F0'
						barSize={20}
						name='Внутренний рынок'
						label={{ position: 'top', fill: '#7367F0', fontSize: 12 }}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default MarketBarChart
