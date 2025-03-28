import { Box, Typography, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import YearDropdown from '../../YearDropdown'
import HomeDoughnut from '../homeDoughnut/HomeDoughnut'

function HomeSelfEmployedCard() {
	const { data: amount } = useQuery({
		queryKey: ['selfemployment'],
		queryFn: async () => {
			const res = await fetch('/db/selfEmployment/ózin_ózi_bánt_qılǵanlar.json')
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	const theme = useTheme()
	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='h6' fontWeight='bold'>
				Самозанятый
			</Typography>

			<YearDropdown />
			<HomeDoughnut
				total={
					amount && amount['ózin_ózi_bánt_qılǵanlar']['Nókis qalası']['2025']
				}
			/>
		</Box>
	)
}

export default HomeSelfEmployedCard
