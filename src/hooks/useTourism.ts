import { useQuery } from '@tanstack/react-query'
import { MONTHS } from '../const/monthsOfYear'
import { TourismService } from '../services/tourism.service'
import {
	GroupData,
	MapCountries,
	TourismOverviewItem,
} from '../types/tourism.interface'

export function useGetTourismLastUpdate() {
	return useQuery({
		queryKey: ['tourism_last_update'],
		queryFn: TourismService.getTourismLastUpdate,
		select: (data: string) => {
			const date = data.split(' ')[0]
			return date
		},
	})
}

export function useGetTourismOverview(year: number) {
	return useQuery<TourismOverviewItem[]>({
		queryKey: ['tourism_overview', year],
		queryFn: () => TourismService.getToursimOverview(year),
		enabled: !!year,
		select: (data) =>
			data.map((item) => ({
				...item,
				monthLabel: MONTHS.find((m) => m.value === item.month)?.label ?? 'N/A',
			})),
	})
}

export function useGetTourismCountries() {
	return useQuery<MapCountries[]>({
		queryKey: ['tourism_countries'],
		queryFn: TourismService.getTourismCountries,
	})
}

export function useGetTourismSummary() {
	return useQuery({
		queryKey: ['tourism_summary'],
		queryFn: TourismService.getTourismSummary,
	})
}

export function useGetTourismGroupSummary(year: number, month: number) {
	return useQuery<GroupData[]>({
		queryKey: ['tourism_group_summary', year, month],
		queryFn: () => TourismService.getTourismGroupSummary(year, month),
		enabled: !!year && !!month,
	})
}

export function useGetTourismYears() {
	return useQuery({
		queryKey: ['tourism_years'],
		queryFn: () => TourismService.getTourismYears(),
	})
}
