import { Box, Typography, useTheme } from '@mui/material'
import { useClientFirms } from '../../../../hooks/useAgriculture'
import HomeDoughnut from '../../../home/components/homeDoughnut/HomeDoughnut'
import CompaniesModal from './CompaniesModal'

function Companies() {
	const { data: companies } = useClientFirms()

	const theme = useTheme()
	return (
		<Box
			className='h-[35%] w-full rounded-2xl p-4 flex justify-between '
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<header className='flex flex-col justify-between '>
				<div>
					<Typography variant='h6' fontWeight='bold'>
						Сельско-хозяйственный фирмы
					</Typography>
					<p className='text-neutral-500'>за последний год</p>
				</div>
				<CompaniesModal data={companies ? companies.data : []} />
			</header>
			<HomeDoughnut total={String(companies?.total)} />
		</Box>
	)
}

export default Companies
