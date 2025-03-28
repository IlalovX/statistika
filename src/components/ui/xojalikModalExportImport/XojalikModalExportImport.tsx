import {
	Backdrop,
	Box,
	Button,
	Fade,
	Modal,
	Tab,
	Tabs,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import CountriesTable from './CountriesTable'
import ProductsTable from './ProductsTable'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}

function XojalikModalExportImport() {
	const [value, setValue] = useState(0)

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
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
						<Tabs
							value={value}
							onChange={handleChange}
							TabIndicatorProps={{ style: { display: 'none' } }}
							sx={{
								'& .MuiTab-root': { color: 'gray' }, 
								'& .Mui-selected': { color: 'blue', fontWeight: 'bold' }, 
							}}
						>
							<Tab label='По странам' />
							<Tab label='По продуктам' />
						</Tabs>
						<CustomTabPanel value={value} index={0}>
							<CountriesTable />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<ProductsTable />
						</CustomTabPanel>
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}

export default XojalikModalExportImport
