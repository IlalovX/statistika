import { Box, Skeleton, useTheme } from '@mui/material'
import { useState } from 'react'
import { MonthSelect } from '../../components/common/MonthSelect/MonthSelect'
import { YearSelect } from '../../components/common/YearSelect/YearSelect'
import ThemeText from '../../components/ThemeText'
import { currentMonth, currentYear } from '../../const/monthsOfYear'
import {
	useGetTourismGroupSummary,
	useGetTourismLastUpdate,
} from '../../hooks/useTourism'
import ChartCard from './components/ChartCard'
import Groups from './components/Groups'
import MapCard from './components/MapCard'

function Tourism() {
	const { data: last_update } = useGetTourismLastUpdate()
	const [selectedYear, setSelectedYear] = useState(currentYear)
	const [selectedMonth, setSelectedMonth] = useState(currentMonth)

	const { data: group_summary } = useGetTourismGroupSummary(
		selectedYear,
		selectedMonth.value
	)

	const theme = useTheme()

	return (
		<div className='space-y-15'>
			<section>
				<ThemeText variant='h4' text='Туризм' />
				<p className='text-gray-400'>
					Последний обновления{' '}
					<span
						className='font-bold '
						style={{
							color: theme.palette.mode === 'light' ? 'black' : 'white',
						}}
					>
						{last_update}
					</span>
				</p>
				<ChartCard />
			</section>
			<section>
				<ThemeText variant='h4' text='Источники/страны' />
				<MapCard />
			</section>
			<section>
				<div className='flex gap-4 my-5 justify-end items-center'>
					<YearSelect value={selectedYear} onChange={setSelectedYear} />
					<MonthSelect value={selectedMonth} onChange={setSelectedMonth} />
				</div>

				{!group_summary ? (
					<div className='grid grid-cols-4 gap-5'>
						{Array.from({ length: 16 }).map((_, i) => (
							<Box
								key={i}
								sx={{
									padding: 2,
									borderRadius: 2,
									border: `1px solid ${theme.palette.divider}`,
									backgroundColor: theme.palette.background.paper,
								}}
							>
								<Skeleton variant='circular' width={40} height={40} />
								<Skeleton height={30} width='60%' style={{ marginTop: 10 }} />
								<Skeleton height={20} width='80%' />
							</Box>
						))}
					</div>
				) : (
					group_summary.map(group => (
						<Groups group={group} key={group.group_name} />
					))
				)}
			</section>
		</div>
	)
}

export default Tourism
