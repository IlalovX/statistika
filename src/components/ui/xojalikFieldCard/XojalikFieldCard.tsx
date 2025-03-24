import { Box, Typography, useTheme } from '@mui/material'
import ThemeText from '../themeText/ThemeText'

function XojalikFieldCard() {
	const infoData = [
		{
			icon: '/svg/xojalik/XojalikFields/Background.svg',
			value: `0 т`,
			label: 'Площадь посевных земель',
		},
		{
			icon: '/svg/xojalik/XojalikFields/Background (1).svg',
			value: '0',
			label: 'Посевная площадь',
		},
		{
			icon: '/svg/xojalik/XojalikFields/Background (2).svg',
			value: '0',
			label: 'Площадь свободных земель',
		},
	]
	const theme = useTheme()
	return (
		<div>
			<ThemeText variant='h4' text='Пахотные поля' />
			<Typography variant='h6' color='gray'>
				сравнее прошлым годом
			</Typography>
			<div className='grid grid-cols-2 gap-5 mt-4'>
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
								+18.2% <span className='text-gray-400'>За последний месяц</span>
							</Typography>
						</div>
					</Box>
				))}
			</div>
		</div>
	)
}

export default XojalikFieldCard
