import ChartCard from '../../components/ui/chartCard/ChartCard'
import MapCard from '../../components/ui/mapCard/MapCard'
import ThemeText from '../../components/ui/themeText/ThemeText'
import TourismDirection from '../../components/ui/tourism/tourismDirection/TourismDirection'
import TourismInfostructure from '../../components/ui/tourism/tourismInfostructure/TourismInfostructure'
import TourismPurpose from '../../components/ui/tourism/tourismPurpose/TourismPurpose'
import TourismShortInfo from '../../components/ui/tourism/tourismShortInfo/TourismShortInfo'

function Tourism() {
	return (
		<div>
			<ThemeText variant='h4' text='Туризм' />
			<ChartCard
				start='Общее количество Туристов'
				end='Общее прибыль от Туристов'
				data={{
					start: 'Туристы',
					end: 'Прибыль',
					startValue: '700',
					endValue: '1 000$',
				}}
			/>
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
