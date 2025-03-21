import { Box, Typography, useTheme } from '@mui/material'
import YearDropdown from '../../YearDropdown'
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

			<YearDropdown />
			<HomeDoughnut total='0' />
		</Box>
	)
}

export default HomeSelfEmployedCard
