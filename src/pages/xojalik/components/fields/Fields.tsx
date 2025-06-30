import { Typography } from '@mui/material'
import { useState } from 'react'
import { YearSelect } from '../../../../components/common/YearSelect/YearSelect'
import ThemeText from '../../../../components/ThemeText'
import { currentYear } from '../../../../const/monthsOfYear'
import {
	usePlacementArea,
	usePlacementHarvested,
	usePlacementPlanted,
} from '../../../../hooks/useAgriculture'
import FieldCard from './FieldCard'

interface Props {
	years: number[]
}

function Fields({ years }: Props) {
	const [year, setYear] = useState(currentYear)
	const { data: area } = usePlacementArea(year)
	const { data: planted } = usePlacementPlanted(year)
	const { data: harvested } = usePlacementHarvested(year)

	return (
		<div>
			<header className='flex justify-between items-center'>
				<div>
					<ThemeText variant='h4' text='Пахотные поля' />
					<Typography variant='h6' color='gray'>
						Сравнение с предыдущим годом
					</Typography>
				</div>
				<YearSelect onChange={setYear} value={year} years={years}/>
			</header>

			<div className='grid grid-cols-2 gap-5 mt-4'>
				<FieldCard name='Площадь посевных земель' item={area} />
				<FieldCard name='Посевная площадь' item={planted} />
				<FieldCard name='Площадь свободных земель' item={harvested} />
			</div>
		</div>
	)
}

export default Fields
