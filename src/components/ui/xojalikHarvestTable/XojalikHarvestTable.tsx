import { Agriculture } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
	useTheme,
} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Pagination from '@mui/material/Pagination'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

const productIcons: Record<string, string> = {
	Рис: '/',
	Картофель: '/svg/products/kartoshka.svg',
	Морковь: '/svg/products/markov.svg',
	Лук: '/svg/products/polin.svg',
	Кунжут: '/svg/products/kundjut.svg',
	Хлопок: '/svg/products/hlopok.svg',
}

function ModalTable({ rows, isLoading }: { rows: any[]; isLoading: boolean }) {
	const [page, setPage] = useState(0)
	const pageSize = 10

	const columns = useMemo<GridColDef[]>(
		() => [
			{
				field: 'products',
				headerName: 'Продукты',
				flex: 2,
				renderCell: params => (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
							textTransform: 'capitalize',
						}}
					>
						<img src='/svg/products/ris.svg' alt='' width={24} height={24} />
						{params.value}
					</div>
				),
			},
			{ field: 'weigh', headerName: 'Масса (т)', flex: 2 },
			{ field: 'price', headerName: 'Цена ($)', flex: 1 },
			{ field: 'percent', headerName: 'Проценты', flex: 1 },
		],
		[]
	)

	return (
		<div>
			{isLoading ? (
				<Typography align='center'>Загрузка...</Typography>
			) : (
				<>
					<DataGrid
						rows={rows.slice(page * pageSize, (page + 1) * pageSize)}
						columns={columns}
						hideFooter
						checkboxSelection
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
				</>
			)}
		</div>
	)
}

export default function AgricultureTable() {
	const theme = useTheme()
	const [open, setOpen] = useState(false)

	// Запрос данных с сервера
	const { data: harvest, isLoading } = useQuery({
		queryKey: ['harvest'],
		queryFn: async () => {
			const res = await fetch(
				'/db/others/bárshe_turlerinde_islep_shıģılģan_dıyqanshılıq_ònimleri_haqqında.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	// Преобразуем данные для таблицы
	const processedData = useMemo(() => {
		if (!harvest) return []
		return Object.keys(harvest).map((key, index) => ({
			id: index + 1,
			products: key,
			weigh: harvest[key][2024] || 0, // Данные за 2024 год
			price: '-', // Если цена неизвестна
			percent: 0,
		}))
	}, [harvest])

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='h6' className='font-semibold text-gray-700'>
				Урожай <span className='text-blue-600 font-bold'>0 </span>
			</Typography>

			<TableContainer className='mt-4'>
				<Table>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={3} align='center'>
									Загрузка...
								</TableCell>
							</TableRow>
						) : (
							processedData.slice(0, 4).map(item => (
								<TableRow key={item.id}>
									<TableCell>
										<Typography className='flex items-center gap-2 font-medium '>
											<Avatar sx={{ width: 24, height: 24 }}>
												<Agriculture fontSize='small' />
											</Avatar>
											{item.products}
										</Typography>
									</TableCell>
									<TableCell sx={{ color: 'gray.600' }}>
										{item.weigh} т
									</TableCell>
									<TableCell sx={{ color: 'gray.600' }}>{item.price}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<Box className='mt-3 text-right'>
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
							<ModalTable rows={processedData} isLoading={isLoading} />
						</Box>
					</Fade>
				</Modal>
			</Box>
		</Box>
	)
}
