import MapCard from '../../components/ui/mapCard/MapCard'
import ThemeText from '../../components/ui/themeText/ThemeText'
import TourismChartCard from '../../components/ui/tourismChartCard/TourismChartCard'
import TourismDirection from '../../components/ui/tourismDirection/TourismDirection'
import TourismInfostructure from '../../components/ui/tourismInfostructure/TourismInfostructure'
import TourismPurpose from '../../components/ui/tourismPurpose/TourismPurpose'
import TourismShortInfo from '../../components/ui/tourismShortInfo/TourismShortInfo'

function Tourism() {
	return (
		<div>
			<ThemeText variant='h4' text='Туризм' />
			<TourismChartCard />
			<ThemeText variant='h4' text='Источники/страны' />

			<MapCard start='Прибывшие туристы' end='Уехавшие туристы' />
			<TourismShortInfo />
			<TourismPurpose />
			<TourismDirection />
			<TourismInfostructure />
		</div>
	)
}

export default Tourism
