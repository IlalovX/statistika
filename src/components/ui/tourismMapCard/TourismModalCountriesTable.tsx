import CloseIcon from '@mui/icons-material/Close'
import {
	Backdrop,
	Box,
	Fade,
	IconButton,
	Modal,
	Pagination,
	Typography,
	useTheme,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'

interface TourismModalCountriesTableProps {
	data: Record<string, number>
}

const TourismModalCountriesTable: React.FC<TourismModalCountriesTableProps> = ({
	data,
}) => {
	const theme = useTheme()
	const [open, setOpen] = useState(false)
	const [page, setPage] = useState(0)
	const pageSize = 10

	const rows = useMemo(
		() =>
			Object.entries(data).map(([country, count]) => ({
				id: country,
				country,
				count,
				flag: `https://flagcdn.com/w40/${countryToCode[country]}.png`,
			})),
		[data]
	)

	const columns: GridColDef[] = [
		{
			field: 'flag',
			headerName: '',
			width: 50,
			renderCell: params => (
				<div className='flex items-center justify-center h-full w-full'>
					<img
						src={params.value}
						alt='flag'
						style={{ width: 30, borderRadius: 4 }}
					/>
				</div>
			),
		},
		{
			field: 'country',
			headerName: 'Страна',
			flex: 1,
		},
		{
			field: 'count',
			headerName: 'Количество',
			flex: 1,
		},
	]

	return (
		<>
			<Typography
				onClick={() => setOpen(true)}
				sx={{ color: 'blue', cursor: 'pointer', mt: 2 }}
			>
				Посмотреть все →
			</Typography>

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
							minWidth: 800,
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
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography
								variant='h5'
								sx={{ color: theme.palette.text.primary, mb: 2 }}
							>
								Прибывшие туристы
							</Typography>
							<IconButton onClick={() => setOpen(false)}>
								<CloseIcon />
							</IconButton>
						</Box>

						<DataGrid
							rows={rows.slice(page * pageSize, (page + 1) * pageSize)}
							columns={columns}
							getRowId={row => row.id}
							hideFooter
							autoHeight
							sx={{ border: 0 }}
						/>

						<Pagination
							count={Math.ceil(rows.length / pageSize)}
							page={page + 1}
							onChange={(_, newPage) => setPage(newPage - 1)}
							sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
						/>
					</Box>
				</Fade>
			</Modal>
		</>
	)
}

// Карта соответствий стран → ISO-кодов флагов (нужны для CDN)
const countryToCode: Record<string, string> = {
	США: 'us',
	Великобритания: 'gb',
	Япония: 'jp',
	Германия: 'de',
	Франция: 'fr',
	Италия: 'it',
	Турция: 'tr',
	Казахстан: 'kz',
	Китай: 'cn',
	Россия: 'ru',
	Польша: 'pl',
	Индия: 'in',
}

export default TourismModalCountriesTable
