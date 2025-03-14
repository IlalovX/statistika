import { Typography } from '@mui/material'
import { getDataPopulation } from '../../services/query'

function CustomTooltipContent({ data }: { data: string }) {
	const population = getDataPopulation()
	console.log(population)

	return (
		<>
			<span className='text-xs text-gray-400'>2024 г</span>
			<p className='text-xs'>Нукус</p>
			<Typography variant='h6' className='text-blue-400 text-[16px]'>
				329 тыс
			</Typography>
		</>
	)
}
export default CustomTooltipContent
