import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart'

export default function GridDemo() {
	return (
		<Stack direction='row' sx={{ width: '100%' }}>
			<Box sx={{ flexGrow: 1 }}>
				<SparkLineChart
					data={[1, 4, 2, 5, 7, 2, 4, 6]}
					height={100}
					showHighlight
					showTooltip
				/>
			</Box>
		</Stack>
	)
}
