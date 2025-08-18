import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

export default function HomeExportImportButton() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [year, setYear] = useState('2025')
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (selectedYear?: string) => {
		if (selectedYear) setYear(selectedYear)
		setAnchorEl(null)
	}
	const theme = useTheme()
	return (
		<div>
			<Button
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
			>
				{year}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={() => handleClose()}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				sx={{
					'& .MuiPaper-root': {
						bgcolor: theme.palette.background.default,
					},
				}}
			>
				{['2025', '2024', '2023'].map((y) => (
					<MenuItem key={y} onClick={() => handleClose(y)} sx={{ padding: 1 }}>
						{y}
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}
