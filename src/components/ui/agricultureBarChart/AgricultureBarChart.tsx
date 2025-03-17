import { Box, Typography, useTheme } from '@mui/material'
import {
	BarPlot,
	ChartsLegend,
	ChartsTooltip,
	ChartsXAxis,
	ChartsYAxis,
	LinePlot,
	MarkPlot,
	ResponsiveChartContainer,
} from '@mui/x-charts'
import { monthsOfYear } from '../../../const/monthsOfYear'

function AgricultureBarChart() {
	const theme = useTheme()

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div className='flex gap-2'>
				<Typography variant='h6' className='text-[#355CBF]'>
					Экспорт
				</Typography>
				<Typography variant='h6' className='text-[#93A3AB]'>
					Внутренний рынок
				</Typography>
			</div>

			<ResponsiveChartContainer
				height={250}
				series={[
					{
						type: 'bar',
						data: [35, 45, 30, 40, 35, 30, 28, 37, 42, 45, 30, 15],
						label: 'Экспорт',
					},
					{
						type: 'line',
						data: [30, 35, 25, 37, 30, 20, 25, 20, 35, 40, 25, 12],
						label: 'Внутренний рынок',
					},
				]}
				xAxis={[
					{
						data: monthsOfYear,
						scaleType: 'band',
						id: 'x-axis-id',
					},
				]}
				yAxis={[
					{
						min: 0,
						max: 50,
						id: 'y-axis-id',
					},
				]}
			>
				<BarPlot />
				<LinePlot />
				<MarkPlot />
				<ChartsTooltip />
				<ChartsXAxis position='bottom' axisId='x-axis-id' />
				<ChartsYAxis position='left' axisId='y-axis-id' />
				<ChartsLegend />
			</ResponsiveChartContainer>
		</Box>
	)
}

export default AgricultureBarChart
