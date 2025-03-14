import Paper from '@mui/material/Paper'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// Импорт SVG-иконок
import Hlopok from '/products/hlopok.svg'
import Kartoshka from '/products/kartoshka.svg'
import Kundjut from '/products/kundjut.svg'
import Markov from '/products/markov.svg'
import Polin from '/products/polin.svg'
import Ris from '/products/ris.svg'

const rows = [
	{ id: 1, products: 'Рис', weigh: 1050, price: 200, icon: Ris },
	{ id: 2, products: 'Картофель', weigh: 2000, price: 250, icon: Kartoshka },
	{ id: 3, products: 'Морковь', weigh: 1020, price: 300, icon: Markov },
	{ id: 4, products: 'Лук', weigh: 5000, price: 100, icon: Polin },
	{ id: 5, products: 'Кунжут', weigh: 3005, price: 150, icon: Kundjut },
	{ id: 6, products: 'Хлопок', weigh: 2080, price: 120, icon: Hlopok },
]

const columns: GridColDef[] = [
	{
		field: 'products',
		headerName: 'Продукты',
		flex: 2,
		resizable: false,
		sortable: true,
		disableColumnMenu: true,
		renderCell: params => (
			<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				<img src={params.row.icon} alt={params.value} width={32} height={32} />
				{params.value}
			</div>
		),
	},
	{
		field: 'weigh',
		headerName: 'Масса(т)',
		flex: 2,
		resizable: false,
		sortable: false,
		disableColumnMenu: true,
	},
	{
		field: 'price',
		headerName: 'Цена',
		type: 'string',
		flex: 1,
		resizable: false,
		sortable: false,
		disableColumnMenu: true,
		renderCell: params => (
			<div className='flex items-center'>{params.value} $</div>
		),
	},
]

const paginationModel = { page: 0, pageSize: 5 }

export default function SanaatTable() {
	return (
		<Paper sx={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				sx={{ border: 0 }}
			/>
		</Paper>
	)
}
