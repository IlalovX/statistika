import { type JSX } from 'react'
import { Navigate } from 'react-router'
import { logout } from '../../../features/slices/UserMeSlices'
import { useGetUserMe } from '../../../hooks/useUserMe'
import {
	getAccessToken,
	getRefreshToken,
	removeTokens,
} from '../../../services/auth-token.service'
import { useAppDispatch } from '../../../utils/helpers'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const user = useGetUserMe()
	const accessToken = getAccessToken()
	const refreshToken = getRefreshToken()
	const dispatch = useAppDispatch()

	if (!user || !accessToken || !refreshToken) {
		removeTokens()
		dispatch(logout())
		return <Navigate to='/auth' replace />
	}

	return children
}
