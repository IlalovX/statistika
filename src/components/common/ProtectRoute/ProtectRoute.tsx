import type { JSX } from 'react'
import { Navigate } from 'react-router'
import { logout } from '../../../features/slices/UserMeSlices'
import { useGetUserMe } from '../../../hooks/useUserMe'
import {
	getAccessToken,
	getRefreshToken,
	removeTokens,
} from '../../../services/auth-token.service'
import { useAppDispatch } from '../../../utils/helpers'
import LoadingFallback from '../Loading/LoadingFallback'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const { data: user, isLoading, isError } = useGetUserMe()
	const accessToken = getAccessToken()
	const refreshToken = getRefreshToken()
	const dispatch = useAppDispatch()

	if (isLoading) {
		return <LoadingFallback />
	}

	if (!accessToken || !refreshToken || isError || !user) {
		removeTokens()
		dispatch(logout())
		return <Navigate to='/auth' replace />
	}

	return children
}
