import { Box, Typography, useTheme } from '@mui/material'
import HomeDoughnut from '../homeDoughnut/HomeDoughnut'

function HomeSelfEmployedCard() {
	const theme = useTheme()
	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='h6' fontWeight='bold'>
				Самозанятый
			</Typography>
			<p className='text-gray-400'>за 2025г</p>
			<HomeDoughnut total='250' />
		</Box>
	)
}

export default HomeSelfEmployedCard
