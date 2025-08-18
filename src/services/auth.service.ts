import { axiosClassic } from '../api/interceptors'
import { ILoginForm } from '../types/auth.interface'

export async function login(data: ILoginForm) {
	const formData = new FormData()
	formData.append('username', data.username)
	formData.append('password', data.password)
	const response = await axiosClassic.post('/admin/login', data, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
	return response.data
}
