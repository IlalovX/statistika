import { Box, Typography } from '@mui/material'

function StatsHeader({ start, end }: { start: string; end: string }) {
	return (
		<header className='flex justify-between items-start m-10'>
			<Box className='flex gap-10'>
				<Box>
					<p className='text-gray-400'>{start}</p>
					<Typography variant='h6'>0</Typography>
					<p className='text-gray-400'>
						<span className='text-green-500 text-xl'>0%</span> за последний
						месяц
					</p>
				</Box>
				<Box>
					<p className='text-gray-400'>{end}</p>
					<Typography variant='h6' className='text-[#355CBF]'>
						0 $
					</Typography>
					<p className='text-gray-400'>
						<span className='text-green-500 text-xl'>0%</span> за последний
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
