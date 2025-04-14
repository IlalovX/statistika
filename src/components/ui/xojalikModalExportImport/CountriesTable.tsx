'use client'

import Pagination from '@mui/material/Pagination'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'

function Table() {
	const [page, setPage] = useState(0)
	const pageSize = 10

	const rows = useMemo(
		() => [
			{
				id: 1,
				country: 'Россия',
				flag: 'RU',
				mass: 0,
				percent: '0%',
				price: 0,
			},
			{
				id: 2,
				country: 'Казахстан',
				flag: 'KZ',
				mass: 0,
				percent: '0%',
				price: 0,
			},
			{
				id: 3,
				country: 'Кыргызстан',
				flag: 'KG',
				mass: 0,
				percent: '0%',
				price: 0,
			},
			{
				id: 4,
				country: 'Беларусь',
				flag: 'BY',
				mass: 0,
				percent: '0%',
				price: 0,
			},
			{
				id: 5,
				country: 'Украина',
				flag: 'UA',
				mass: 0,
				percent: '0%',
				price: 0,
			},
			{
				id: 6,
				country: 'Франция',
				flag: 'FR',
				mass: 0,
				percent: '0%',
				price: 0,
			},
			{
				id: 7,
				country: 'Испания',
				flag: 'ES',
				mass: 0,
				percent: '0%',
				price: 0,
			},
		],
		[]
	)

	const columns = useMemo<GridColDef[]>(
		() => [
			{
				field: 'country',
				headerName: 'Страны',
				flex: 2,
				disableColumnMenu: true,
				renderCell: params => (
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						<img
							src={`/svg/countries/${params.row.flag}.svg`}
							alt={params.value}
							width={32}
							height={32}
						/>
						{params.value}
					</div>
				),
				headerClassName: 'bold-header',
			},
			{
				field: 'mass',
				headerName: 'Масса (т)',
				flex: 2,
				disableColumnMenu: true,
				headerClassName: 'bold-header',
			},
			{
				field: 'price',
				headerName: 'Цена ($)',
				flex: 2,
				disableColumnMenu: true,
				renderCell: params => <div>{params.value} $</div>,
				headerClassName: 'bold-header',
			},
			{
				field: 'percent',
				headerName: 'Процент',
				flex: 1,
				disableColumnMenu: true,
				headerClassName: 'bold-header',
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
						fontSize: '13px',
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

function CountriesTable() {
	return <Table />
}

export default CountriesTable
