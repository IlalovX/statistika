import ThemeText from '../../components/ThemeText'
import TourismChartCard from '../../components/ui/tourismChartCard/TourismChartCard'
import TourismDirection from '../../components/ui/tourismDirection/TourismDirection'
import TourismInfostructure from '../../components/ui/tourismInfostructure/TourismInfostructure'
import TourismMapCard from '../../components/ui/tourismMapCard/TourismMapCard'
import TourismPurpose from '../../components/ui/tourismPurpose/TourismPurpose'
import TourismShortInfo from '../../components/ui/tourismShortInfo/TourismShortInfo'

function Tourism() {
	return (
		<div className='space-y-10'>
			<section>
				<ThemeText variant='h4' text='Туризм' />
				<TourismChartCard />
			</section>
			<section>
				<ThemeText variant='h4' text='Источники/страны' />
				<TourismMapCard start='Прибывшие туристы' end='Уехавшие туристы' />
			</section>
			<section>
				<TourismShortInfo />
				<TourismPurpose />
				<TourismDirection />
				<TourismInfostructure />
			</section>
		</div>
	)
}

export default Tourism
