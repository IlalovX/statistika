import { useQuery } from '@tanstack/react-query'
import { axiosClassic } from '../../api/axios'
import { RegionsErrorType, RegionsSuccessType } from '../../types/queries'

export const getRegions = () => {
	return useQuery<RegionsSuccessType[], RegionsErrorType>({
		queryKey: ['getRegions'],
		queryFn: async () => {
			const res = await axiosClassic.get(
				'/regions/?skip=0&limit=100&include_deleted=false'
			)
			return res.data
		},
	})
}

export const getRegionDetail = ({ id }: { id: string }) => {
	return useQuery<RegionsSuccessType, RegionsErrorType>({
		queryKey: ['getRegionDetail', id],
		queryFn: async () => {
			const res = await axiosClassic.get(
				`/regions/${id}/?skip=0&limit=100&include_deleted=false`
			)
			return res.data
		},
	})
}
