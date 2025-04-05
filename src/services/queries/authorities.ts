import { useQuery } from '@tanstack/react-query'
import { axiosClassic } from '../../api/axios'
import {
	AuthoritiesErrorType,
	AuthoritiesSuccessType,
} from '../../types/queries'

export const getAuthorities = () => {
	return useQuery<AuthoritiesSuccessType[], AuthoritiesErrorType>({
		queryKey: ['getAuthorities'],
		queryFn: async () => {
			const res = await axiosClassic.get(
				'/authorities/?skip=0&limit=100&include_deleted=false'
			)
			return res.data
		},
	})
}

export const getAuthoritiesDetail = ({ id }: { id: string }) => {
	return useQuery<AuthoritiesSuccessType, AuthoritiesErrorType>({
		queryKey: ['getAuthoritiesDetail', id],
		queryFn: async () => {
			const res = await axiosClassic.get(
				`/authorities/${id}/?skip=0&limit=100&include_deleted=false`
			)
			return res.data
		},
	})
}
