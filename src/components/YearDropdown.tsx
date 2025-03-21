import ExpandLessIcon from '@mui/icons-material/ExpandLess' // Стрелка вверх
import ExpandMoreIcon from '@mui/icons-material/ExpandMore' // Стрелка вниз
import { Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

const years = [2025, 2024, 2023]

export default function YearDropdown() {
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
		<div>
			<Button
				disableFocusRipple
				disableRipple
				variant='outlined'
				onClick={handleClick}
				endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				sx={{ border: 'none', color: '#8D8A94' }}
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
		</div>
	)
}
