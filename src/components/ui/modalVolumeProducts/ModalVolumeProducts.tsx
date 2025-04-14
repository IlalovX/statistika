'use client'

import { useTheme } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Pagination from '@mui/material/Pagination'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'

function ModalTable() {
	const [page, setPage] = useState(0)
	const pageSize = 10

	const rows = useMemo(
		() => [
			{
				id: 1,
				region: 'Горнодобывающая промышленность и разработка карьеров',
				year2023: 0,
				year2024: 0,
				year2025: 0,
			},
			{
				id: 2,
				region: 'Производственная промышленность',
				year2023: 0,
				year2024: 0,
				year2025: 0,
			},
			{
				id: 3,
				region: 'Производство продуктов питания',
				year2023: 0,
				year2024: 0,
				year2025: 0,
			},
			{
				id: 4,
				region: 'Производство напитков',
				year2023: 0,
				year2024: 0,
				year2025: 0,
			},
			{
				id: 5,
				region: 'Производство табачной продукции',
				year2023: 0,
				year2024: 0,
				year2025: 0,
			},
			{
				id: 6,
				region: 'Производство текстильной продукции',
				year2023: 0,
				year2024: 0,
				year2025: 0,
			},
			{
				id: 7,
				region: 'Производство одежды',
				year2023: 0,
				year2024: 0,
				year2025: 0,
			},
			{
				id: 8,
				region: 'Производство кожи и связанных с ней изделий',
				year2023: 0,
				year2024: 0,
				year2025: 0,
			},
			{
				id: 9,
				region: 'Производство одежды',
				year2023: 0,
				year2024: 0,
				year2025: 0,
			},
		],
		[]
	)

	const columns = useMemo<GridColDef[]>(
		() => [
			{
				field: 'region',
				headerName: 'Районы',
				flex: 3,
				headerClassName: 'bold-header',
				sortable: false,
				filterable: false,
				disableColumnMenu: true,
			},
			{
				field: 'year2023',
				headerName: '2023',
				flex: 1,
				headerClassName: 'bold-header',
				sortable: false,
				filterable: false,
				disableColumnMenu: true,
			},
			{
				field: 'year2024',
				headerName: '2024',
				flex: 1,
				headerClassName: 'bold-header',
				sortable: false,
				filterable: false,
				disableColumnMenu: true,
			},
			{
				field: 'year2025',
				headerName: '2025',
				flex: 1,
				headerClassName: 'bold-header',
				sortable: false,
				filterable: false,
				disableColumnMenu: true,
			},
		],
		[]
	)

	return (
		<div>
			<DataGrid
				rows={rows.slice(page * pageSize, (page + 1) * pageSize)}
				columns={columns}
				hideFooter
				disableColumnFilter
				disableColumnSelector
				disableColumnMenu
				disableColumnResize
				disableRowSelectionOnClick
				sx={{
					border: 0,
					height: 600,
					'& .MuiDataGrid-columnHeaders': {
						fontWeight: 'bold',
						fontSize: '16px',
						cursor: 'default', // Remove pointer cursor
					},
					'& .bold-header': {
						fontWeight: 900, // Extra bold
					},
					'& .MuiDataGrid-columnHeaderTitle': {
						fontWeight: 'bold',
						fontSize: '16px',
					},
					// Remove hover effects
					'& .MuiDataGrid-columnHeader:hover': {
						backgroundColor: 'inherit',
					},
					'& .MuiDataGrid-columnHeader:focus': {
						outline: 'none',
					},
					// Remove sort icons
					'& .MuiDataGrid-sortIcon': {
						display: 'none',
					},
					'& .MuiDataGrid-iconButtonContainer': {
						display: 'none',
					},
				}}
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
		</div>
	)
}

export default function ModalVolumeProducts() {
	const theme = useTheme()
	const [open, setOpen] = useState(false)

	return (
		<div>
			<Button onClick={() => setOpen(true)} sx={{ float: 'right' }}>
				Подробнее →
			</Button>
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
						<ModalTable />
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
