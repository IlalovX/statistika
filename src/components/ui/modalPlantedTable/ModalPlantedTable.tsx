import { useTheme } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Pagination from '@mui/material/Pagination'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'

const productIcons = {
	Рис: '/svg/products/ris.svg',
	Картофель: '/svg/products/kartoshka.svg',
	Морковь: '/svg/products/markov.svg',
	Лук: '/svg/products/polin.svg',
	Кунжут: '/svg/products/kundjut.svg',
	Хлопок: '/svg/products/hlopok.svg',
}

function ModalTable() {
	const [page, setPage] = useState(0)
	const pageSize = 10

	const rows = useMemo(
		() =>
			[
				{
					id: 17,
					products: 'Рис',
					weigh: 1050,
					price: 200,
					icon: productIcons['Рис'],
				},
				{
					id: 18,
					products: 'Картофель',
					weigh: 2000,
					price: 250,
					icon: productIcons['Картофель'],
				},
				{
					id: 19,
					products: 'Морковь',
					weigh: 1020,
					price: 300,
					icon: productIcons['Морковь'],
				},
				{
					id: 20,
					products: 'Лук',
					weigh: 5000,
					price: 100,
					icon: productIcons['Лук'],
				},
				{
					id: 21,
					products: 'Кунжут',
					weigh: 3005,
					price: 150,
					icon: productIcons['Кунжут'],
				},
			].concat(
				Array.from({ length: 16 }, (_, i) => ({
					id: i + 1,
					products: 'Хлопок',
					weigh: 2080,
					price: 120,
					icon: productIcons['Хлопок'],
				}))
			),
		[]
	)

	const columns = useMemo<GridColDef[]>(
		() => [
			{
				field: 'products',
				headerName: 'Продукты',
				flex: 2,
				renderCell: params => (
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						<img
							src={params.row.icon}
							alt={params.value}
							width={32}
							height={32}
						/>
						{params.value}
					</div>
				),
			},
			{ field: 'weigh', headerName: 'Масса (т)', flex: 2 },
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
				sx={{ border: 0, height: 700 }}
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

export default function ModalPlantedTable() {
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
							minHeight: 700,
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
