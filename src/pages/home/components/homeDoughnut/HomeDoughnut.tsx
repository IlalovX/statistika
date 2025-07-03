import { Typography, useTheme } from '@mui/material'

function HomeDoughnut({ total }: { total: string }) {
	const theme = useTheme()
	const isDarkMode = theme.palette.mode === 'dark'
	return (
		<div className='flex items-center justify-center '>
			<div className='relative w-25 h-25 flex items-center justify-center'>
				<div className='absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 rounded-full p-2'>
					<div
						className='w-full h-full rounded-full flex flex-col items-center justify-center'
						style={{
							backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
							color: isDarkMode ? '#fff' : '#000',
						}}
					>
						<Typography variant='h5' fontWeight='bold'>
							{total}
						</Typography>
						<span className='text-green-500 text-xs'>Всего</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomeDoughnut
