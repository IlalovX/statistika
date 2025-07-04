import { axiosWithAuth } from '../api/interceptors'

export const HomeService = {
	async getPopulationOfDistricts() {
		const res = await axiosWithAuth.get('/demography/')
		return res.data.data
	},
}
