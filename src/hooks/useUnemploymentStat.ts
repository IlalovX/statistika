import { useQueries } from '@tanstack/react-query'
import { axiosStat } from '../api/interceptors'

type ApiRegion = {
	id: number
	name: string
	data: Array<{ [year: number]: number }>
}

type ApiResponse = ApiRegion[]

const REGION_NAME = 'Qoraqalpog‘iston Respublikasi'
const REGION_ID = 2

export function useRegionUnemploymentStat(years: number[]) {
	const queries = useQueries({
		queries: years.map((year) => ({
			queryKey: ['unemployment', year],
			queryFn: async (): Promise<ApiResponse> => {
				const res = await axiosStat.get(`1313/cartogram/?years=${year}`)
				return res.data
			},
		})),
	})

	const isLoading = queries.some((q) => q.isLoading)
	const isError = queries.some((q) => q.isError)

	const regionData: Record<number, number> = {}

	queries.forEach((query, index) => {
		const year = years[index]
		const data = query.data
		if (!data) return

		const region = data.find(
			(r) => r.name === REGION_NAME || r.id === REGION_ID
		)
		if (!region) return

		const yearEntry = region.data.find((entry) =>
			Object.prototype.hasOwnProperty.call(entry, year)
		)

		const value = yearEntry?.[year]

		if (value !== undefined) {
			regionData[year] = value
		}
	})

	return {
		data: regionData,
		isLoading,
		isError,
	}
}
