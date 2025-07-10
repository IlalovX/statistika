import { useQuery } from '@tanstack/react-query'
import { userMeService } from '../services/user-me.service'

export function useGetUserMe() {
	return useQuery({
		queryKey: ['user_me'],
		queryFn: async () => await userMeService.getMe(),
		retry: false,
	})
}
