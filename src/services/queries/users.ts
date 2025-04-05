import { useQuery } from '@tanstack/react-query'
import { axiosWithAuth } from '../../api/axios'
import { UsersErrorType, UsersSuccessType } from '../../types/queries'

export const getUsers = () => {
	return useQuery<UsersSuccessType[], UsersErrorType>({
		queryKey: ['getUsers'],
		queryFn: async () => {
			const res = await axiosWithAuth.get('/users/?include_deleted=false')
			return res.data
		},
	})
}
export const getUserDetail = ({ id }: { id: string }) => {
	return useQuery<UsersSuccessType, UsersErrorType>({
		queryKey: ['useUserDetail', id],
		queryFn: async () => {
			const res = await axiosWithAuth.get(`/users/${id}/?include_deleted=false`)
			return res.data
		},
	})
}
