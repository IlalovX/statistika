import { ChartsClipPath } from '@mui/x-charts/ChartsClipPath'
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis'
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis'
import { AreaPlot, LinePlot, MarkPlot } from '@mui/x-charts/LineChart'
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer'
import * as React from 'react'
import { dataset, valueFormatter } from '../../const/lineGraphData'
import { CustomAxisTooltip } from './CustomTooltip'

export default function ChartWithCustomTooltip() {
	const id = React.useId()
	const clipPathId = `${id}-clip-path`

	return (
		<div style={{ width: '100%' }}>
			<ResponsiveChartContainer
				height={300}
				dataset={dataset}
				series={[
					{
						type: 'line',
						dataKey: 'value',
						label: 'Values',
						color: 'blue',
						showMark: true,
						area: true, // Включаем заливку
					},
				]}
				xAxis={[
					{
						scaleType: 'time',
						dataKey: 'date',
						valueFormatter: valueFormatter,
					},
				]}
				yAxis={[
					{
						valueFormatter: value => value.toString(),
					},
				]}
				sx={{
					'& .MuiAreaElement-root': {
						fill: 'url(#myGradient)', // Применяем градиент
					},
				}}
			>
				<ChartsClipPath id={clipPathId} />
				<g clipPath={`url(#${clipPathId})`}>
					<defs>
						<linearGradient id='myGradient' x1='0' y1='0' x2='0' y2='1'>
							<stop
								offset='5%'
								stopColor='rgba(176, 160, 172, 0.70)'
								stopOpacity={0.3}
							/>
							<stop offset='95%' stopColor='transparent' stopOpacity={0} />
						</linearGradient>
					</defs>
					<AreaPlot />
					<LinePlot />
					<MarkPlot />
				</g>
				<ChartsXAxis />
				<ChartsYAxis />
				<CustomAxisTooltip />
			</ResponsiveChartContainer>
		</div>
	)
}
