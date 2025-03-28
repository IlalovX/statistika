import { Box, Typography, useTheme } from '@mui/material'
import ThemeText from '../../ThemeText'
const infoData = [
	{
		icon: '/svg/tourism/TourismDirection/Background.svg',
		value: `0`,
		label: 'Музей',
		amt: '+0%',
	},
	{
		icon: '/svg/tourism/TourismDirection/Background (1).svg',
		value: '0',
		label: 'Эко туризм',
		amt: '+0%',
	},
	{
		icon: '/svg/tourism/TourismDirection/Background (2).svg',
		value: '0',
		label: 'Исторические места',
		amt: '+0%',
	},
	{
		icon: '/svg/tourism/TourismDirection/Background (3).svg',
		value: '0',
		label: 'Этно туризм',
		amt: '+0%',
	},
	{
		icon: '/svg/tourism/TourismDirection/Background (4).svg',
		value: '0',
		label: 'Фестивальный туризм',
		amt: '+0%',
	},
	{
		icon: '/svg/tourism/TourismDirection/Background (7).svg',
		value: '0',
		label: 'Паломничество',
		amt: '+0%',
	},
]

function TourismDirection() {
	const theme = useTheme()
	return (
		<div className='my-5'>
			<ThemeText variant='h4' text='Маршрут и направления' />
			<Typography variant='h6' color='gray'>
				с начало месяца
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
								+0% <span className='text-gray-400'>За последний месяц</span>
							</Typography>
						</div>
					</Box>
				))}
			</div>
		</div>
	)
}

export default TourismDirection
