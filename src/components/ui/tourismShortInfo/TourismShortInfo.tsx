import { Box, Typography, useTheme } from '@mui/material'

import ThemeText from '../../ThemeText'
import { GetTouristData } from '../../../types/queries'

function TourismShortInfo({
	ishki,
	sirtqi,
}: {
	ishki: GetTouristData
	sirtqi: GetTouristData
}) {
	const theme = useTheme()

	let lastValueIshki = '0'
	if (ishki && ishki['2025']) {
		const months = Object.entries(ishki['2025'])
		if (months.length > 0) {
			const [_, value] = months[months.length - 2]
			lastValueIshki = String(value)
		}
	}

	let lastValueSirtqi = '0'
	if (sirtqi) {
		const years = Object.keys(sirtqi).sort((a, b) => Number(b) - Number(a))
		if (years.length > 0) {
			const latestYear = years[0]
			const months = Object.entries(sirtqi[latestYear])
			if (months.length > 0) {
				const [_, value] = months[months.length - 2]
				lastValueSirtqi = String(value)
			}
		}
	}

	const infoData = [
		{
			icon: '/svg/xojalik/XojalikShortInfo/Background (3).svg',
			value: +lastValueIshki + +lastValueSirtqi,
			label: 'Количество туристов',
			amt: '0%',
		},
		{
			icon: '/svg/xojalik/XojalikShortInfo/Background.svg',
			value: lastValueSirtqi,
			label: 'Внешний туризм',
			amt: '0%',
		},
		{
			icon: '/svg/xojalik/XojalikShortInfo/Background (2).svg',
			value: lastValueIshki,
			label: 'Внутренний туризм',
			amt: '0%',
		},
		{
			icon: '/svg/xojalik/XojalikShortInfo/Background (3).svg',
			value: '0',
			label: 'Экспорт туриста',
			amt: '0%',
		},
		{
			icon: '/svg/xojalik/XojalikShortInfo/Background (3).svg',
			value: '0',
			label: 'Средний длительность поездки',
			amt: '0%',
		},
	]

	return (
		<div className='my-5'>
			<ThemeText variant='h4' text='Краткая информация' />
			<Typography variant='h6' color='gray'>
				Краткая информация
			</Typography>
			<div className='grid grid-cols-4 gap-4 my-5'>
				{infoData.map((item, index) => (
					<Box
						key={index}
						className=' shadow-md rounded-xl p-4 space-y-2'
						sx={{
							backgroundColor: 'background.paper',
							border: `1px solid ${theme.palette.divider}`,
						}}
					>
						<div className='flex items-center gap-2'>
							<img src={item.icon} alt={item.label} className='w-10 h-10' />
							<Typography className='text-xl font-semibold'>
								{item.value}
							</Typography>
						</div>

						<div>
							<Typography className='text-gray-500'>{item.label}</Typography>
							<Typography className='text-green-500 text-sm mt-1'>
								{item.amt}{' '}
								<span className='text-gray-400'>За последний месяц</span>
							</Typography>
						</div>
					</Box>
				))}
			</div>
		</div>
	)
}

export default TourismShortInfo
