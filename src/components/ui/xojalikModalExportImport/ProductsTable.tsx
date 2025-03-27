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
				russia: 5000,
				kazakhstan: 200,
				kyrgyzstan1: 5000,
				kyrgyzstan2: 5000,
				kyrgyzstan3: 5000,
				kyrgyzstan4: 5000,
			},
			{
				id: 2,
				product: 'Капуста',
				russia: 3000,
				kazakhstan: 300,
				kyrgyzstan1: 3000,
				kyrgyzstan2: 3000,
				kyrgyzstan3: 3000,
				kyrgyzstan4: 3000,
			},
			{
				id: 3,
				product: 'Рис',
				russia: 4200,
				kazakhstan: 500,
				kyrgyzstan1: 4200,
				kyrgyzstan2: 4200,
				kyrgyzstan3: 4200,
				kyrgyzstan4: 4200,
			},
			{
				id: 4,
				product: 'Хлопок',
				russia: 1358,
				kazakhstan: 412,
				kyrgyzstan1: 1358,
				kyrgyzstan2: 1358,
				kyrgyzstan3: 1358,
				kyrgyzstan4: 1358,
			},
			{
				id: 5,
				product: 'Морковь',
				russia: 9231,
				kazakhstan: 658,
				kyrgyzstan1: 9231,
				kyrgyzstan2: 9231,
				kyrgyzstan3: 9231,
				kyrgyzstan4: 9231,
			},
			{
				id: 6,
				product: 'Пшеница',
				russia: 531,
				kazakhstan: 596,
				kyrgyzstan1: 531,
				kyrgyzstan2: 531,
				kyrgyzstan3: 531,
				kyrgyzstan4: 531,
			},
			{
				id: 7,
				product: 'Полынь',
				russia: 159,
				kazakhstan: 865,
				kyrgyzstan1: 159,
				kyrgyzstan2: 159,
				kyrgyzstan3: 159,
				kyrgyzstan4: 159,
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
