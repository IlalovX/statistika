import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateUserMe } from '../features/slices/UserMeSlices'
import { saveTokens } from '../services/auth-token.service'
import { login } from '../services/auth.service'
import { userMeService } from '../services/user-me.service'
import { useAppDispatch } from '../utils/helpers'

type LoginDto = {
	username: string
	password: string
}

export function useLogin() {
	const queryClient = useQueryClient()
	const dispatch = useAppDispatch()
	return useMutation({
		mutationFn: async (data: LoginDto) => {
			return await login(data)
		},

		onSuccess: async data => {
			saveTokens(data.access_token, data.refresh_token)

			const user = await queryClient.fetchQuery({
				queryKey: ['user'],
				queryFn: async () => {
					return await userMeService.getMe()
				},
			})
			dispatch(updateUserMe(user))
			queryClient.setQueryData(['user'], user)
		},
		onError: () => {
			toast.error('Ошибка авторизации!')
		},
	})
}
