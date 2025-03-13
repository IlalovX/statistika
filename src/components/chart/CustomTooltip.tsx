import NoSsr from '@mui/material/NoSsr'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Typography from '@mui/material/Typography'
import { useAxisTooltip, useMouseTracker } from '@mui/x-charts/ChartsTooltip'
import { generateVirtualElement } from './genrateElement'

export function CustomAxisTooltip() {
	const tooltipData = useAxisTooltip()
	const mousePosition = useMouseTracker() // Track the mouse position on chart.

	if (!tooltipData || !mousePosition) {
		// No data to display
		return null
	}

	// The pointer type can be used to have different behavior based on pointer type.
	const isMousePointer = mousePosition?.pointerType === 'mouse'
	// Adapt the tooltip offset to the size of the pointer.
	const yOffset = isMousePointer ? 0 : 40 - mousePosition.height

	return (
		<NoSsr>
			<Popper
				sx={{
					pointerEvents: 'none',
					zIndex: theme => theme.zIndex.modal,
				}}
				open
				placement={isMousePointer ? 'top-end' : 'top'}
				anchorEl={generateVirtualElement(mousePosition)}
				modifiers={[
					{
						name: 'offset',
						options: {
							offset: [0, yOffset],
						},
					},
				]}
			>
				<Paper
					elevation={0}
					sx={{
						m: 1,
						border: 'solid',
						borderWidth: 2,
						borderColor: 'divider',
						table: { borderSpacing: 0 },
						thead: {
							td: {
								px: 1.5,
								py: 0.75,
							},
						},
						tbody: {
							'tr:first-child': { td: { paddingTop: 1.5 } },
							'tr:last-child': { td: { paddingBottom: 1.5 } },
							tr: {
								'td:first-child': { paddingLeft: 1.5 },
								'td:last-child': { paddingRight: 1.5 },
								td: {
									paddingRight: '7px',
									paddingBottom: '10px',
								},
							},
						},
					}}
				>
					<table>
						<thead>
							<tr>
								<td colSpan={3}>
									<Typography>{tooltipData.axisFormattedValue}</Typography>
								</td>
							</tr>
						</thead>
						<tbody>
							{tooltipData.seriesItems.map(seriesItem => (
								<tr key={seriesItem.seriesId}>
									<td>
										<Typography fontWeight='bold'>Туристы</Typography>
										<Typography color='blue' fontWeight='bold' variant='h5'>
											250$
										</Typography>
									</td>

									<td>
										<Typography fontWeight='bold'>Прибыль</Typography>
										<Typography color='blue' fontWeight='bold' variant='h5'>
											1000$
										</Typography>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</Paper>
			</Popper>
		</NoSsr>
	)
}
