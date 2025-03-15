import { Box, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ThemeText from '../themeText/ThemeText'

function HomeAgesCard() {
	const theme = useTheme()
	const [ageData, setAgeData] = useState<Record<string, string> | null>(null)

	const { data: ages } = useQuery({
		queryKey: ['ages'],
		queryFn: async () => {
			const res = await fetch(
				'/db/ages/turaqlı_xalıq_sanı_jas_kategoriyalar_boyınsha_tek_qaralpaqstan.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	useEffect(() => {
		if (ages) {
			const ageStats = ages['Qaraqalpaqstan Respublikası']['2024']
			setAgeData(ageStats)
		}
	}, [ages])

	if (!ageData) return <p>Загрузка...</p>

	const total = Number(ageData.total)
	const ageGroups = Object.entries(ageData).filter(([key]) => key !== 'total')

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<ThemeText text='Население' variant='h6' />
			<p className='text-gray-400'>за 2024г</p>
			<ul className='space-y-2'>
				{ageGroups.map(([age, value]) => {
					const percentage = (Number(value) / total) * 100
					return (
						<li key={age} className='flex justify-between items-center'>
							<div
								className='bg-[#7367F0] h-2 rounded-xl'
								style={{ width: `${percentage}%` }}
							/>
							<span className='text-xs'>
								{' '}
								{age === 'up to 80'
									? `больше ${age.slice(-2)}`
									: `до ${age}`}{' '}
								лет
							</span>
						</li>
					)
				})}
			</ul>
		</Box>
	)
}

export default HomeAgesCard
