import { Pagination } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'

function Table() {
	const columns: GridColDef[] = useMemo(
		() => [
			{ field: 'product', headerName: 'Продукты', flex: 1 },
			{ field: 'russia', headerName: 'Россия', flex: 1 },
			{ field: 'kazakhstan', headerName: 'Казахстан', flex: 1 },
			{ field: 'kyrgyzstan1', headerName: 'Кыргызстан 1', flex: 1 },
			{ field: 'kyrgyzstan2', headerName: 'Кыргызстан 2', flex: 1 },
			{ field: 'kyrgyzstan3', headerName: 'Кыргызстан 3', flex: 1 },
			{ field: 'kyrgyzstan4', headerName: 'Кыргызстан 4', flex: 1 },
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
				kyrgyzstan1: 0,
				kyrgyzstan2: 0,
				kyrgyzstan3: 0,
				kyrgyzstan4: 0,
			},
			{
				id: 2,
				product: 'Капуста',
				russia: 0,
				kazakhstan: 0,
				kyrgyzstan1: 0,
				kyrgyzstan2: 0,
				kyrgyzstan3: 0,
				kyrgyzstan4: 0,
			},
			{
				id: 3,
				product: 'Рис',
				russia: 0,
				kazakhstan: 0,
				kyrgyzstan1: 0,
				kyrgyzstan2: 0,
				kyrgyzstan3: 0,
				kyrgyzstan4: 0,
			},
			{
				id: 4,
				product: 'Хлопок',
				russia: 0,
				kazakhstan: 0,
				kyrgyzstan1: 0,
				kyrgyzstan2: 0,
				kyrgyzstan3: 0,
				kyrgyzstan4: 0,
			},
			{
				id: 5,
				product: 'Морковь',
				russia: 0,
				kazakhstan: 0,
				kyrgyzstan1: 0,
				kyrgyzstan2: 0,
				kyrgyzstan3: 0,
				kyrgyzstan4: 0,
			},
			{
				id: 6,
				product: 'Пшеница',
				russia: 0,
				kazakhstan: 0,
				kyrgyzstan1: 0,
				kyrgyzstan2: 0,
				kyrgyzstan3: 0,
				kyrgyzstan4: 0,
			},
			{
				id: 7,
				product: 'Полынь',
				russia: 0,
				kazakhstan: 0,
				kyrgyzstan1: 0,
				kyrgyzstan2: 0,
				kyrgyzstan3: 0,
				kyrgyzstan4: 0,
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
		</div>
	)
}
function ProductsTable() {
	return <Table />
}

export default ProductsTable
