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
								px: .75,
								py: 0.5,
							},
						},
						tbody: {
							'tr:first-child': { td: { paddingTop: .5 } },
							'tr:last-child': { td: { paddingBottom: .5 } },
							tr: {
								'td:first-child': { paddingLeft: .5 },
								'td:last-child': { paddingRight: .5 },
								td: {
									paddingRight: '5px',
									paddingBottom: '5px',
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
										<Typography color='blue' fontWeight='500' variant='h6'>
											250$
										</Typography>
									</td>

									<td>
										<Typography fontWeight='bold'>Прибыль</Typography>
										<Typography color='blue' fontWeight='500' variant='h6'>
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
