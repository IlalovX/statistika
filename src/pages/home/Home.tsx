import { Typography } from '@mui/material'
import ChartCard from '../../components/chartCard/ChartCard'

function Home() {
	return (
		<div>
			<Typography variant='h3' gutterBottom>
				Туризм
			</Typography>
			<ChartCard />
			<ChartCard />
		</div>
	)
}

export default Home
