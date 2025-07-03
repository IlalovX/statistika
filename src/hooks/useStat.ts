import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { axiosStat } from '../api/interceptors'

export interface RegionPopulation {
	id: number
	map_code: string
	name: string
	name_en: string
	name_ru: string
	name_uz: string
	name_uzc: string
	is_root: boolean
	data: YearPopulationEntry[]
}

export type YearPopulationEntry = {
	[year: number]: number
}

export function useGetPopulationStat() {
	return useQuery<RegionPopulation[]>({
		queryKey: ['stat'],
		queryFn: async () => {
			const res = await axiosStat.get('246/cartogram/?years=2025')
			return res.data
		},
	})
}

export function useRegionPopulationStat(regionName: string) {
	const { data, isLoading } = useGetPopulationStat()

	const { yearMap, years } = useMemo(() => {
		const region = data?.find((r) => r.name === regionName)
		if (!region) return { yearMap: {}, years: [] }

		const yearMap: Record<string, number> = {}

		region.data.forEach((entry) => {
			const year = Object.keys(entry)[0]
			const value = Object.values(entry)[0]
			if (year && value) {
				yearMap[year] = value
			}
		})

		const years = Object.keys(yearMap).sort()

		return { yearMap, years }
	}, [data, regionName])

	return {
		yearMap,
		years,
		loading: isLoading,
	}
}
