import { useQuery } from '@tanstack/react-query'
import { axiosClassic } from '../../api/axios'
import { StatusesErrorType, StatusesSuccessType } from '../../types/queries'

export const getStatuses = () => {
	return useQuery<StatusesSuccessType[], StatusesErrorType>({
		queryKey: ['getStatuses'],
		queryFn: async () => {
			const res = await axiosClassic.get(
				'/statuses/?skip=0&limit=100&include_deleted=false'
			)
			return res.data
		},
	})
}

export const getStatusDetail = ({ id }: { id: string }) => {
	return useQuery<StatusesSuccessType, StatusesErrorType>({
		queryKey: ['getStatusDetail', id],
		queryFn: async () => {
			const res = await axiosClassic.get(
				`/statuses/${id}/?skip=0&limit=100&include_deleted=false`
			)
			return res.data
		},
	})
}
