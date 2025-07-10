import { axiosWithAuth } from '../api/interceptors'

export const HomeService = {
	async getPopulationOfDistricts() {
		const res = await axiosWithAuth.get('/demography/')
		return res.data.data
	},
	async getPopulationAgeGender() {
		const res = await axiosWithAuth.get('/uploads/demography/summary')
		return res.data
	},
	async getPoverty() {
		const res = await axiosWithAuth.get('/uploads/poverty')
		return res.data.data
	},
}
