import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart'

export default function GridDemo() {
	return (
		<Stack direction='row' sx={{ width: '100%', height: '77px' }}>
			<Box sx={{ flexGrow: 1 }}>
				<SparkLineChart
					data={[1, 40,15,60,20,80]}
					height={77}
					showHighlight
					showTooltip
				/>
			</Box>
		</Stack>
	)
}
