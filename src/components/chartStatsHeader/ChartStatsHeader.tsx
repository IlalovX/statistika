import { Box, Typography } from '@mui/material'

function StatsHeader() {
	return (
		<header className='flex justify-between items-start m-10'>
			<Box className='flex gap-10'>
				<Box>
					<p className='text-gray-400'>Общее количество Туристов</p>
					<Typography variant='h6'>1500</Typography>
					<p className='text-gray-400'>
						<span className='text-green-500 text-xl'>+3,4%</span> за последний
						месяц
					</p>
				</Box>
				<Box>
					<p className='text-gray-400'>Общее прибыль от Туристов</p>
					<Typography variant='h6' className='text-[#355CBF]'>
						3 500 $
					</Typography>
					<p className='text-gray-400'>
						<span className='text-green-500 text-xl'>+3,4%</span> за последний
						месяц
					</p>
				</Box>
			</Box>
			<Box className='flex gap-2 text-gray-400'>
				<span className='cursor-pointer'>День</span>
				<span className='cursor-pointer'>Неделя</span>
				<span className='text-blue-400 font-bold cursor-pointer'>Месяц</span>
				<span className='cursor-pointer'>Год</span>
			</Box>
		</header>
	)
}
export default StatsHeader
