import ChartCard from '../../components/chartCard/ChartCard'
import MapCard from '../../components/mapCard/MapCard'
import ThemeText from '../../components/themeText/ThemeText'

function Tourism() {
	return (
		<div>
			<ThemeText variant='h4' text='Туризм' />
			<ChartCard />
			<ThemeText variant='h4' text='Источники/страны' />
			<MapCard />
		</div>
	)
}

export default Tourism
