import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import ThemeText from '../../components/ThemeText'
import TourismChartCard from '../../components/ui/tourismChartCard/TourismChartCard'
import TourismDirection from '../../components/ui/tourismDirection/TourismDirection'
import TourismInfostructure from '../../components/ui/tourismInfostructure/TourismInfostructure'
import TourismMapCard from '../../components/ui/tourismMapCard/TourismMapCard'
import TourismPurpose from '../../components/ui/tourismPurpose/TourismPurpose'
import TourismShortInfo from '../../components/ui/tourismShortInfo/TourismShortInfo'
import { GetTouristData } from '../../types/queries'

function Tourism() {
	const { data: ishki } = useQuery<GetTouristData>({
		queryKey: ['ishki'],
		queryFn: async () => {
			const res = await axios.get('/db/tourism/ishki_turistler.json')
			return res.data
		},
	})
	const { data: sirtqi } = useQuery<GetTouristData>({
		queryKey: ['sirtqi'],
		queryFn: async () => {
			const res = await axios.get('/db/tourism/sırt_ellik_turistler_sanı.json')
			return res.data
		},
	})
	return (
		<div className='space-y-10'>
			<section>
				<ThemeText variant='h4' text='Туризм' />
				<TourismChartCard
					sirtqi={sirtqi ? sirtqi : {}}
					ishki={ishki ? ishki : {}}
				/>
			</section>
			<section>
				<ThemeText variant='h4' text='Источники/страны' />
				<TourismMapCard start='Прибывшие туристы' end='Уехавшие туристы' />
			</section>
			<section>
				<TourismShortInfo
					sirtqi={sirtqi ? sirtqi : {}}
					ishki={ishki ? ishki : {}}
				/>
				<TourismPurpose />
				<TourismDirection />
				<TourismInfostructure />
			</section>
		</div>
	)
}

export default Tourism
