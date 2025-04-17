'use client'

import type React from 'react'

import Agriculture from '@mui/icons-material/Agriculture'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
	Avatar,
	Box,
	Button,
	Menu,
	MenuItem,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import ModalPlantedTable from '../modalPlantedTable/ModalPlantedTable'
import { useQuery } from '@tanstack/react-query'

export default function XojalikPlantedTable() {
	const theme = useTheme()

	const { data: accommodation } = useQuery({
		queryKey: ['accommodation'],
		queryFn: async () => {
			const res = await fetch(
				'/db/others/bárshe_turlerinde_islep_shıģılģan_dıyqanshılıq_ònimleri_haqqında.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	const years = useMemo(() => {
		if (!accommodation) return []
		const sampleKey = Object.keys(accommodation)?.[0]
		if (!sampleKey) return []

		return Object.keys(accommodation[sampleKey])
			.filter(year => /^\d{4}$/.test(year))
			.map(Number)
			.sort((a, b) => b - a) // Сортировка по убыванию
	}, [accommodation])

	const [selectedYear, setSelectedYear] = useState<number | null>(null)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const processedData = useMemo(() => {
		if (!accommodation || !selectedYear) return []
		return Object.keys(accommodation)
			.filter(key => key.toLowerCase() !== 'total')
			.map(key => ({
				name: key,
				area: 0,
				planted: 0,
				yield: accommodation[key][selectedYear] || 0,
				percentage: 0,
			}))
	}, [accommodation, selectedYear])

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (year?: number) => {
		if (year !== undefined) setSelectedYear(year)
		setAnchorEl(null)
	}

	// Устанавливаем самый свежий год по умолчанию
	if (!selectedYear && years.length) {
		setSelectedYear(years[0])
	}

	return (
		<Box
			className='p-5 rounded-xl shadow-md relative'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center'>
				<Typography variant='h4' className='font-semibold text-gray-700'>
					Показатели
				</Typography>
				<div>
					<Button
						disableFocusRipple
						disableRipple
						variant='contained'
						onClick={handleClick}
						endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
						sx={{
							boxShadow: 'none',
							color: 'blue',
							bgcolor: '#E9E7FD',
							padding: '5px 8px',
						}}
					>
						<span className='lowercase mr-1'>за</span> {selectedYear || '-'}
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
						{years.slice(0, 4).map(year => (
							<MenuItem key={year} onClick={() => handleClose(year)}>
								{year}
							</MenuItem>
						))}
					</Menu>
				</div>
			</div>

			<TableContainer className='mt-4'>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>Площадь</TableCell>
							<TableCell>Посажено</TableCell>
							<TableCell>Урожай</TableCell>
							<TableCell>Процент</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{processedData.slice(0, 4).map((item, index) => (
							<TableRow key={index}>
								<TableCell>
									<Typography className='flex items-center gap-2 font-medium'>
										<Avatar sx={{ width: 24, height: 24 }}>
											<Agriculture fontSize='small' />
										</Avatar>
										{item.name}
									</Typography>
								</TableCell>
								<TableCell>{item.area}</TableCell>
								<TableCell>{item.planted}</TableCell>
								<TableCell>{item.yield.toFixed(0)}</TableCell>
								<TableCell>{item.percentage}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Box className='mt-3 text-right'>
				<Typography
					variant='body2'
					className='text-blue-600 font-medium cursor-pointer hover:underline'
				>
					<ModalPlantedTable data={accommodation} selectedYear={selectedYear} />
				</Typography>
			</Box>
		</Box>
	)
}
