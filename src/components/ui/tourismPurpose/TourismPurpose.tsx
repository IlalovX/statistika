import { Box, Typography, useTheme } from '@mui/material'
import ThemeText from '../../ThemeText'
const infoData = [
	{
		icon: '/svg/tourism/TourismPurpose/Background (3).svg',
		value: `0 `,
		label: 'Бизнес',
		amt: '0%',
	},
	{
		icon: '/svg/tourism/TourismPurpose/Background.svg',
		value: '0',
		label: 'Лечение',
		amt: '0%',
	},
	{
		icon: '/svg/tourism/TourismPurpose/Background (2).svg',
		value: '0',
		label: 'Отдых',
		amt: '0%',
	},
	{
		icon: '/svg/tourism/TourismPurpose/Background (3).svg',
		value: '0',
		label: 'Спорт',
		amt: '0%',
	},
	{
		icon: '/svg/tourism/TourismPurpose/Background (3).svg',
		value: '0',
		label: 'Транзит',
		amt: '0%',
	},
]

function TourismPurpose() {
	const theme = useTheme()
	return (
		<div className='my-5'>
			<ThemeText variant='h4' text='Цели поездки' />
			<Typography variant='h6' color='gray'>
				с начало месяца
			</Typography>
			<div className='grid grid-cols-5 gap-4 my-5'>
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

export default TourismPurpose
