import { BarChart } from '@mui/x-charts'

const dataset = [
	{ age: 'Jan', value: 15 },
	{ age: 'May', value: 45 },
	{ age: 'July', value: 55 },
	{ age: 'Dec', value: 25 },
]

function HomeBarChart() {
	return (
		<BarChart
			dataset={dataset}
			yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
			series={[{ dataKey: 'seoul', label: 'Seoul rainfall' }]}
			layout='horizontal'
		/>
	)
}

export default HomeBarChart
