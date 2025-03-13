import { Box, Stack } from '@mui/material'
import Chart from '../chart/Chart'
import StatsHeader from '../chartStatsHeader/ChartStatsHeader'

function ChartCard() {
	return (
		<Box className='shadow-2xl w-full rounded-2xl p-2.5 mb-20'>
			<StatsHeader />
			<Stack direction='column' width='100%' spacing={1}>
				<Chart />
			</Stack>
		</Box>
	)
}
export default ChartCard
