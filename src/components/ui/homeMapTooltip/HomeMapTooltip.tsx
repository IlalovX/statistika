import { Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

function CustomTooltipContent({ data }: { data: string }) {
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
			<span className='text-xs text-gray-400'>2024 г</span>
			<p className='text-xl'>{data}</p>
			<Typography variant='body2' className='text-blue-400 text-[12px]'>
				{population && population[data]['2024']}тыс
			</Typography>
		</>
	)
}
export default CustomTooltipContent
