import Pagination from '@mui/material/Pagination'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
function Table() {
	const [page, setPage] = useState(0)
	const pageSize = 10
	const rows = useMemo(
		() =>
			[
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
			].concat(
				Array.from({ length: 16 }, (_, i) => ({
					id: 8 + i,
					country: 'Испания',
					flag: 'ES',
					mass: 0,
					percent: '0%',
					price: 0,
				}))
			),
		[]
	)

	const columns = useMemo<GridColDef[]>(
		() => [
			{
				field: 'country',
				headerName: 'страны',
				flex: 2,
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
			},
			{ field: 'mass', headerName: 'Масса (т)', flex: 2 },
			{ field: 'percent', headerName: 'Процент', flex: 2 },
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

function CountriesTable() {
	return <Table />
}

export default CountriesTable
