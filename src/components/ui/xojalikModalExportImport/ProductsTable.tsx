'use client'

import { Pagination } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'

function Table() {
	const columns: GridColDef[] = useMemo(
		() => [
			{
				field: 'product',
				headerName: 'Продукты',
				flex: 1,
				headerClassName: 'bold-header',
				sortable: false,
				filterable: false,
				disableColumnMenu: true,
			},
			{
				field: 'russia',
				headerName: 'Россия',
				flex: 1,
				headerClassName: 'bold-header',
				sortable: false,
				filterable: false,
				disableColumnMenu: true,
			},
			{
				field: 'kazakhstan',
				headerName: 'Казахстан',
				flex: 1,
				headerClassName: 'bold-header',
				sortable: false,
				filterable: false,
				disableColumnMenu: true,
			},
		],
		[]
	)

	const rows = useMemo(
		() => [
			{
				id: 1,
				product: 'Картошка',
				russia: 0,
				kazakhstan: 0,
			},
			{
				id: 2,
				product: 'Капуста',
				russia: 0,
				kazakhstan: 0,
			},
			{
				id: 3,
				product: 'Рис',
				russia: 0,
				kazakhstan: 0,
			},
			{
				id: 4,
				product: 'Хлопок',
				russia: 0,
				kazakhstan: 0,
			},
			{
				id: 5,
				product: 'Морковь',
				russia: 0,
				kazakhstan: 0,
			},
			{
				id: 6,
				product: 'Пшеница',
				russia: 0,
				kazakhstan: 0,
			},
			{
				id: 7,
				product: 'Полынь',
				russia: 0,
				kazakhstan: 0,
			},
		],
		[]
	)

	const [page, setPage] = useState(0)
	const pageSize = 10
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

function ProductsTable() {
	return <Table />
}

export default ProductsTable
