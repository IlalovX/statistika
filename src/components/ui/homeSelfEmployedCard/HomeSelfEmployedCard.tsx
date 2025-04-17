import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
	Box,
	Button,
	Menu,
	MenuItem,
	Typography,
	useTheme,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import HomeDoughnut from '../homeDoughnut/HomeDoughnut'

const years = [2025, 2024, 2023]

function HomeSelfEmployedCard() {
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
	const { data: amount } = useQuery({
		queryKey: ['selfemployment'],
		queryFn: async () => {
			const res = await fetch('/db/selfEmployment/ózin_ózi_bánt_qılǵanlar.json')
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

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
			<HomeDoughnut
				total={
					amount &&
					amount['ózin_ózi_bánt_qılǵanlar'] &&
					amount['ózin_ózi_bánt_qılǵanlar']['Nókis qalası'] &&
					amount['ózin_ózi_bánt_qılǵanlar']['Nókis qalası'][selectedYear]
				}
			/>
		</Box>
	)
}

export default HomeSelfEmployedCard
