import { Typography, useTheme } from '@mui/material'
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
				headerName: 'Cтраны',
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
			{
				field: 'price',
				headerName: 'Цена ($)',
				align: 'center',
				headerAlign: 'center',
				flex: 1,
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

function SanaatModalInvest() {
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
						<Typography
							variant='h4'
							sx={{
								color: theme.palette.mode === 'light' ? '#355CBF' : 'white',
							}}
						>
							Инвесторы из зарубежа
						</Typography>
						<CountriesTable />
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
export default SanaatModalInvest
