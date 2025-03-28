import { Typography, useTheme } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Pagination from '@mui/material/Pagination'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'

function RegionTable() {
	const [page, setPage] = useState(0)
	const pageSize = 10

	const rows = useMemo(
		() => [
			{
				id: 1,
				region: 'Шымбай',
				area: 0,
				mass: 0,
				export: 0,
				market: 0,
				limit: 0,
			},
			{
				id: 2,
				region: 'Кунград',
				area: 0,
				mass: 0,
				export: 0,
				market: 0,
				limit: 0,
			},
			{
				id: 3,
				region: 'Нукус',
				area: 0,
				mass: 0,
				export: 0,
				market: 0,
				limit: 0,
			},
			{
				id: 4,
				region: 'Тахтакопир',
				area: 0,
				mass: 0,
				export: 0,
				market: 0,
				limit: 0,
			},
			{
				id: 5,
				region: 'Амударья',
				area: 0,
				mass: 0,
				export: 0,
				market: 0,
				limit: 0,
			},
			{
				id: 6,
				region: 'Муйнак',
				area: 0,
				mass: 0,
				export: 0,
				market: 0,
				limit: 0,
			},
			{
				id: 7,
				region: 'Шоманай',
				area: 0,
				mass: 0,
				export: 0,
				market: 0,
				limit: 0,
			},
			{
				id: 8,
				region: 'Кегейли',
				area: 0,
				mass: 0,
				export: 0,
				market: 0,
				limit: 0,
			},
			{
				id: 9,
				region: 'Тахиаташ',
				area: 0,
				mass: 0,
				export: 0,
				market: 0,
				limit: 0,
			},
		],
		[]
	)

	const columns = useMemo<GridColDef[]>(
		() => [
			{ field: 'region', headerName: 'Районы', flex: 2 },
			{ field: 'area', headerName: 'Площадь (га)', flex: 2 },
			{ field: 'mass', headerName: 'Масса урожая (т)', flex: 2 },
			{ field: 'export', headerName: 'Экспорт', flex: 2 },
			{ field: 'market', headerName: 'Внутренний рынок', flex: 2 },
			{ field: 'limit', headerName: 'Лимит в (м³)', flex: 2 },
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
function ProductsTable() {
	const [page, setPage] = useState(0)
	const pageSize = 10

	const rows = useMemo(
		() => [
			{ id: 1, product: 'Рис', area: 0, mass: 0, export: 0, market: 0 },
			{ id: 2, product: 'Картошка', area: 0, mass: 0, export: 0, market: 0 },
			{ id: 3, product: 'Хлопок', area: 0, mass: 0, export: 0, market: 0 },
			{ id: 4, product: 'Морковь', area: 0, mass: 0, export: 0, market: 0 },
			{ id: 5, product: 'Пшеница', area: 0, mass: 0, export: 0, market: 0 },
			{ id: 6, product: 'Полынь', area: 0, mass: 0, export: 0, market: 0 },
			{ id: 7, product: 'Кунжут', area: 0, mass: 0, export: 0, market: 0 },
			{ id: 8, product: 'Кунжут', area: 0, mass: 0, export: 0, market: 0 },
			{ id: 9, product: 'Полынь', area: 0, mass: 0, export: 0, market: 0 },
		],
		[]
	)

	const columns = useMemo<GridColDef[]>(
		() => [
			{ field: 'product', headerName: 'Продукты', flex: 2 },
			{ field: 'area', headerName: 'Площадь (га)', flex: 2 },
			{ field: 'mass', headerName: 'Масса (т)', flex: 2 },
			{ field: 'export', headerName: 'Экспорт', flex: 2 },
			{ field: 'market', headerName: 'Внутренний рынок', flex: 2 },
		],
		[]
	)

	return (
		<div>
			<header className='flex items-center justify-between gap-5 mb-5'>
				<Button sx={{ width: '100%' }} variant='contained'>
					Все
				</Button>
				<Button sx={{ width: '100%' }} variant='outlined'>
					Нукус
				</Button>
				<Button sx={{ width: '100%' }} variant='outlined'>
					Шимбай
				</Button>
				<Button sx={{ width: '100%' }} variant='outlined'>
					Хожели
				</Button>
				<Button sx={{ width: '100%' }} variant='outlined'>
					Тахтакупир
				</Button>
				<Button sx={{ width: '100%' }} variant='outlined'>
					Кунград
				</Button>
			</header>
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

function XojalikModalRegionTable() {
	const theme = useTheme()
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState(true)
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
						{selected ? (
							<Typography variant='h5'>Показатели</Typography>
						) : (
							<Typography variant='h5'>По районам</Typography>
						)}

						<div className='flex gap-4 my-5'>
							<Typography
								className={`cursor-pointer ${selected ? 'text-[#7367F0] font-bold p-1 border-2 rounded-[5px]' : 'text-gray-500 p-1'}`}
								onClick={() => setSelected(true)}
							>
								Общее
							</Typography>
							<Typography
								className={`cursor-pointer ${!selected ? 'text-[#7367F0] font-bold border-2 p-1 rounded-[5px]' : 'text-gray-500 p-1'}`}
								onClick={() => setSelected(false)}
							>
								По районам
							</Typography>
						</div>
						{selected ? <RegionTable /> : <ProductsTable />}
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}

export default XojalikModalRegionTable
