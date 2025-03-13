import { Typography } from '@mui/material'
import ChartCard from '../../components/chartCard/ChartCard'
import MapCard from '../../components/mapCard/MapCard'

function Tourism() {
	return (
		<div>
			<Typography variant='h3' gutterBottom>
				Туризм
			</Typography>
			<ChartCard />
			<Typography variant='h3' gutterBottom>
			Источники/страны
			</Typography>
			<MapCard />
		</div>
	)
}

export default Tourism
