import { useQuery } from '@tanstack/react-query'
import { TourismGroupsService } from '../services/tourism-groups.service'
import {
	GetTourismGroupData,
	GetTourismGroupList,
	GetTourismSubGroupList,
} from '../types/tourism-groups.interface'

export function useGetTourismGroupList() {
	return useQuery<GetTourismGroupList[]>({
		queryKey: ['group_list'],
		queryFn: TourismGroupsService.getTourismGroupList,
	})
}

export function useGetTourismSubGroupList(id: number | string) {
	return useQuery<GetTourismSubGroupList[]>({
		queryKey: ['sub_group_list', id],
		queryFn: () => TourismGroupsService.getTourismSubGroupList(id),
		enabled: !!id,
	})
}

export function useGetTourismGroupData() {
	return useQuery<GetTourismGroupData[]>({
		queryKey: ['group_data'],
		queryFn: TourismGroupsService.getTourismGroupData,
	})
}
