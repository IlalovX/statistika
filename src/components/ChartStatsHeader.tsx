import ExpandLessIcon from '@mui/icons-material/ExpandLess' // Стрелка вверх
import ExpandMoreIcon from '@mui/icons-material/ExpandMore' // Стрелка вниз
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
const years = [2025, 2024, 2023]
function StatsHeader({ start, end }: { start: string; end: string }) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [selectedYear, setSelectedYear] = useState(years[0])
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (year?: number) => {
		if (year) setSelectedYear(year)
		setAnchorEl(null)
	}
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
			<Button
				disableFocusRipple
				disableRipple
				variant='outlined'
				onClick={handleClick}
				endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				sx={{
					color: '#E9E7FD',
				}}
			>
				<span className='lowercase mr-1'>за</span> {selectedYear}
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
				{years.map(year => (
					<MenuItem key={year} onClick={() => handleClose(year)}>
						{year}
					</MenuItem>
				))}
			</Menu>
		</header>
	)
}
export default StatsHeader
