import { Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

function CustomTooltipContent({ data, year }: { data: string; year: number }) {
	const { data: population } = useQuery({
		queryKey: [data, 'map'],
		queryFn: async () => {
			const res = await fetch('/db/population/population.json')
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	return (
		<>
			<span className='text-xs text-gray-400'>{year} г</span>
			<p className='text-xl'>{data}</p>
			<Typography variant='body2' className='text-blue-400 text-[12px]'>
				{population && population[data][`${year}`]}тыс
			</Typography>
		</>
	)
}
export default CustomTooltipContent
