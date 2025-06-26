import { Box, Skeleton, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { YearSelect } from '../../../../components/common/YearSelect/YearSelect'
import ThemeText from '../../../../components/ThemeText'
import { currentYear } from '../../../../const/monthsOfYear'
import { useSummary } from '../../../../hooks/useAgriculture'
import { AgricultureSummary } from '../../../../types/agriculture.interface'

const LABELS_MAP: Record<keyof AgricultureSummary, string> = {
	yield: 'Урожайность',
	profit: 'Прибыль',
	import: 'Импорт',
	export: 'Экспорт',
}

function Summary() {
	const [year, setYear] = useState(currentYear)
	const { data: summary, isLoading } = useSummary(year)
	const theme = useTheme()

	const renderSkeletons = () =>
		Array.from({ length: 4 }).map((_, i) => (
			<Box
				key={i}
				className='shadow-md rounded-xl p-4 space-y-2'
				sx={{
					backgroundColor: 'background.paper',
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<div className='flex items-center gap-2'>
					<Skeleton variant='circular' width={40} height={40} />
					<Skeleton variant='text' width={60} height={32} />
				</div>
				<div>
					<Skeleton variant='text' width='50%' />
					<Skeleton variant='text' width='30%' />
				</div>
			</Box>
		))

	return (
		<div>
			<header className='flex justify-between items-center'>
				<div>
					<ThemeText variant='h4' text='Краткая информация' />
					<Typography variant='h6' color='gray'>
						Краткая информация по показателям за {year}
					</Typography>
				</div>
				<YearSelect onChange={setYear} value={year} />
			</header>

			<div className='grid grid-cols-2 gap-5 mt-4'>
				{isLoading || !summary
					? renderSkeletons()
					: Object.entries(summary).map(([key, item]) => (
							<Box
								key={key}
								className='shadow-md rounded-xl p-4 space-y-2'
								sx={{
									backgroundColor: 'background.paper',
									border: `1px solid ${theme.palette.divider}`,
								}}
							>
								<div className='flex items-center gap-2'>
									<img
										src={'/svg/xojalik/XojalikShortInfo/Background (3).svg'}
										alt='icon'
										className='w-10 h-10'
									/>
									<Typography className='text-xl font-semibold'>
										{item.value}
									</Typography>
								</div>

								<div>
									<Typography className='text-gray-500'>
										{LABELS_MAP[key as keyof AgricultureSummary] ?? key}
									</Typography>
									<Typography className='text-green-500 text-sm mt-1'>
										{item.percent.value}%{' '}
										<span className='text-gray-400'>за {year}</span>
									</Typography>
								</div>
							</Box>
						))}
			</div>
		</div>
	)
}
export default Summary
