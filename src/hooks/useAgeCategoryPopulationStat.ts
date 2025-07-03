// hooks/useAgeCategoryPopulationStat.ts
import { useQueries } from '@tanstack/react-query'
import { axiosStat } from '../api/interceptors'

const categoryMap: Record<string, string[]> = {
	'>18': ['561', '2838', '589', '600', '607'],
	'>30': ['617', '626', '632'],
	'>50': ['638', '643', '647'],
	'>65': ['650', '1190'],
	'65<': ['1191'],
}

export interface Region {
	id: number
	name: string
	name_uz: string
	name_ru?: string
	name_en?: string
	name_uzc?: string
	is_root?: boolean
	map_code?: string
	data?: { [year: number]: number }[]
}

export function useAgeCategoryPopulationStat(year: number) {
	const queries = Object.entries(categoryMap).map(([category, ids]) => ({
		queryKey: ['age-category', category, year],
		queryFn: async (): Promise<{ category: string; total: number }> => {
			const responses = await Promise.all(
				ids.map((id) =>
					axiosStat
						.get<Region[]>(`${id}/cartogram/?years=${year}`)
						.then((res) => res.data)
				)
			)

			let sum = 0
			for (const response of responses) {
				const qarqalpak = response.find(
					(r) => r.name === 'Qoraqalpog‘iston Respublikasi'
				)
				if (!qarqalpak?.data) continue

				for (const entry of qarqalpak.data) {
					const value = entry[year]
					if (typeof value === 'number') {
						sum += value
					}
				}
			}

			return { category, total: sum }
		},
	}))

	const results = useQueries({ queries })

	const isLoading = results.some((r) => r.isLoading)
	const data = results.map((r) => r.data).filter(Boolean) as {
		category: string
		total: number
	}[]

	return {
		data,
		isLoading,
	}
}
