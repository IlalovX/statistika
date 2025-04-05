import axios, { type CreateAxiosDefaults } from 'axios'
import {
	getAccessToken,
	removeFromStorage,
} from '../services/auth-token.service'
import { errorCath } from './error'

const options: CreateAxiosDefaults = {
	baseURL: 'https://alpamis.space',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()
	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			(error?.response?.status === 401 ||
				errorCath(error) === 'jwt expired' ||
				errorCath(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCath(error) === 'jwt expired') removeFromStorage()
			}
		}
		throw error
	}
)

export { axiosClassic, axiosWithAuth }
