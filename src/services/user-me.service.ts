import { axiosWithAuth } from '../api/interceptors'

export const userMeService = {
	async getMe() {
		const res = await axiosWithAuth.get('/admin/client/me')
		return res.data.data
	},
}
