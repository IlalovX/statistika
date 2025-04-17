'use client'

import {
	Backdrop,
	Box,
	Button,
	Fade,
	Modal,
	Pagination,
	Typography,
	useTheme,
} from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import type React from 'react'
import { useMemo, useState } from 'react'

interface TableRow {
	id: number
	products: string
	weigh: number
	price: number
	icon: string
	area: number
	planted: number
	yieldForecast: number
	yieldCollected: number
	percentage: number
}

interface ModalTableProps {
	data: Record<string, Record<number, number>>
	selectedYear: number | null
}

const ModalTable: React.FC<ModalTableProps> = ({ data, selectedYear }) => {
	const [page, setPage] = useState(0)
	const pageSize = 10

	const processedData = useMemo(() => {
		if (!selectedYear) return []

		return Object.entries(data).map(([key, values]) => ({
			name: key,
			area: 0,
			planted: 0,
			yieldForecast: 0,
			yieldCollected: values[selectedYear] || 0, // Use the selected year instead of hardcoded 2024
			percentage: 0,
		}))
	}, [data, selectedYear])

	const rows: TableRow[] = useMemo(
		() =>
			processedData.map((item, index) => ({
				id: index + 1,
				products: item.name,
				weigh: +item.yieldCollected.toFixed(0),
				price: item.percentage,
				icon: '/svg/projects/Background.svg',
				area: item.area,
				planted: item.planted,
				yieldForecast: item.yieldForecast,
				yieldCollected: +item.yieldCollected.toFixed(0),
				percentage: item.percentage,
			})),
		[processedData]
	)

	const columns: GridColDef[] = useMemo(
		() => [
			{
				field: 'products',
				headerName: 'Продукты',
				flex: 2,
				renderCell: params => (
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						<img
							src={params.row.icon || '/placeholder.svg'}
							alt={params.value}
							width={32}
							height={32}
						/>
						{params.value}
					</div>
				),
			},
			{ field: 'area', headerName: 'Площадь (га)', flex: 1 },
			{ field: 'planted', headerName: 'Посажено (т)', flex: 1 },
			{ field: 'yieldForecast', headerName: 'Урожай прогноз (т)', flex: 1 },
			{ field: 'yieldCollected', headerName: 'Урожай (т)', flex: 1 },
			{ field: 'percentage', headerName: 'Процент (%)', flex: 1 },
			{ field: 'weigh', headerName: 'Масса (т)', flex: 1 },
			{
				field: 'price',
				headerName: 'Цена ($)',
				flex: 1,
				renderCell: params => <div>{params.value} $</div>,
			},
		],
		[]
	)

	return (
		<div>
			{selectedYear && (
				<>
					<Typography variant='h6' className='mb-4'>
						Показатели за {selectedYear} год
					</Typography>
					<DataGrid
						rows={rows.slice(page * pageSize, (page + 1) * pageSize)}
						columns={columns}
						hideFooter
						sx={{ border: 0, height: 600 }}
					/>
					<Pagination
						count={Math.ceil(rows.length / pageSize)}
						page={page + 1}
						onChange={(_, newPage) => setPage(newPage - 1)}
						siblingCount={1}
						boundaryCount={1}
						showFirstButton
						showLastButton
						sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
					/>
				</>
			)}
		</div>
	)
}

interface ModalPlantedTableProps {
	data: Record<string, Record<number, number>>
	selectedYear: number | null
}

const ModalPlantedTable: React.FC<ModalPlantedTableProps> = ({
	data,
	selectedYear,
}) => {
	const theme = useTheme()
	const [open, setOpen] = useState(false)

	return (
		<div>
			<Button onClick={() => setOpen(true)}>Посмотреть все →</Button>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
			>
				<Fade in={open}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							minWidth: 1000,
							minHeight: 600,
							bgcolor:
								theme.palette.mode === 'dark'
									? theme.palette.background.default
									: theme.palette.background.paper,
							border: '2px solid #00000026',
							boxShadow: 24,
							p: 4,
							borderRadius: 2,
						}}
					>
						<ModalTable data={data} selectedYear={selectedYear} />
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}

export default ModalPlantedTable
