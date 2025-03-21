import { useTheme } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Pagination from '@mui/material/Pagination'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'


function CountriesTable() {
	const [page, setPage] = useState(0)
	const pageSize = 10
	const rows = useMemo(
		() =>
			[
				{
					id: 1,
					country: 'Россия',
					flag: 'RU',
					mass: 5000,
					percent: '39.2%',
					price: 5000,
				},
				{
					id: 2,
					country: 'Казахстан',
					flag: 'KZ',
					mass: 3000,
					percent: '32.2%',
					price: 3000,
				},
				{
					id: 3,
					country: 'Кыргызстан',
					flag: 'KG',
					mass: 4200,
					percent: '65.1%',
					price: 4200,
				},
				{
					id: 4,
					country: 'Беларусь',
					flag: 'BY',
					mass: 1358,
					percent: '20.3%',
					price: 1358,
				},
				{
					id: 5,
					country: 'Украина',
					flag: 'UA',
					mass: 9231,
					percent: '24.1%',
					price: 9231,
				},
				{
					id: 6,
					country: 'Франция',
					flag: 'FR',
					mass: 531,
					percent: '45.3%',
					price: 531,
				},
				{
					id: 7,
					country: 'Испания',
					flag: 'ES',
					mass: 159,
					percent: '75.4%',
					price: 159,
				},
			].concat(
				Array.from({ length: 16 }, (_, i) => ({
					id: 8 + i,
					country: 'Испания',
					flag: 'ES',
					mass: 159,
					percent: '75.4%',
					price: 159,
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

function ModalCountriesTable() {
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
						<CountriesTable />
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
export default ModalCountriesTable
