import { Box, Stack } from '@mui/material'
import Chart from '../chart/Chart'
import StatsHeader from '../chartStatsHeader/ChartStatsHeader'

function ChartCard({ start, end }: { start: string; end: string }) {
	return (
		<Box className='shadow-2xl w-full rounded-2xl  mb-20'>
			<StatsHeader start={start} end={end}/>
			<Stack direction='column' width='100%' spacing={1}>
				<Chart />
			</Stack>
		</Box>
	)
}
export default ChartCard
