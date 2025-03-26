import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, Menu, MenuItem, useTheme } from '@mui/material'
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

	const theme = useTheme()
	return (
		<div>
			<Button
				disableFocusRipple
				disableRipple
				variant='outlined'
				onClick={handleClick}
				endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				sx={{
					border: 'none',
					color: '#8D8A94',
					padding: '0',
				}}
			>
				<span className='lowercase mr-1'>за</span> {selectedYear}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={() => handleClose()}
				sx={{
					'& .MuiPaper-root': {
						bgcolor: theme.palette.background.paper,
					},
				}}
			>
				{years.map(year => (
					<MenuItem key={year} onClick={() => handleClose(year)}>
						{year}
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}
