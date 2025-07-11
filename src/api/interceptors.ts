import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { toast } from 'sonner'
import {
	getAccessToken,
	getRefreshToken,
	removeTokens,
	saveTokens,
} from '../services/auth-token.service'
import { errorCath } from './error'

const options: CreateAxiosDefaults = {
	baseURL: import.meta.env.VITE_API_BASE_URL,
}

const axiosStat = axios.create({
	baseURL: 'https://api.siat.stat.uz/sdmx/',
})

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
	const accessToken = getAccessToken()
	if (accessToken && config.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

axiosWithAuth.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		const refreshToken = getRefreshToken()

		if (
			(error.response?.status == 401 ||
				errorCath(error).toLowerCase() === 'token is invalid or expired') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				toast.error('Токен истек')
				const res = await axiosClassic.post('/admin/refresh', {
					refresh_token: refreshToken,
				})

				const newAccessToken = res.data.access_token
				if (newAccessToken) {
					saveTokens(newAccessToken, refreshToken)
					toast.success('Access токен обновлён 🔄')

					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

					return axiosWithAuth(originalRequest)
				} else {
					throw new Error('Access токен не получен')
				}
			} catch (refreshError) {
				toast.error('Сессия истекла. Войдите снова 🔒')
				removeTokens()
				window.location.href = '/auth'
				return Promise.reject(refreshError)
			}
		}

		if (error.response?.status === 403) {
			toast.error('Доступ запрещён ❌')
		}

		return Promise.reject(error)
	}
)

export { axiosClassic, axiosStat, axiosWithAuth }
