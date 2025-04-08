import { useQuery } from '@tanstack/react-query'
import { axiosClassic } from '../../api/axios'
import {
	GetFiltersProjectsData,
	LastUpdateErrorType,
	LastUpdateSuccessType,
	ProjectsErrorType,
	ProjectSuccessType,
} from '../../types/queries'

export const getProjects = () => {
	return useQuery<ProjectSuccessType[], ProjectsErrorType>({
		queryKey: ['getProjects'],
		queryFn: async () => {
			const res = await axiosClassic.get(
				'/projects/?skip=0&limit=1000&include_deleted=false'
			)
			return res.data
		},
	})
}
export const getLastUpdate = () => {
	return useQuery<LastUpdateSuccessType, LastUpdateErrorType>({
		queryKey: ['lastUpdate'],
		queryFn: async () => {
			const res = await axiosClassic.get('/projects/last_update')
			return res.data
		},
	})
}

export const getFilterProjects = (filters?: GetFiltersProjectsData) => {
	return useQuery({
		queryKey: ['filterProjects', filters],
		queryFn: async () => {
			const res = await axiosClassic.get('/projects/filter', {
				params: filters,
			})
			return res.data
		},
		enabled: !!filters, // не запрашивать, пока фильтры не заданы
	})
}
