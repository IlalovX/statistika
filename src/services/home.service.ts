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
	async getSalary() {
		const res = await axiosWithAuth.get('/uploads/salary')
		return res.data.data
	},
	async getUnemployment() {
		const res = await axiosWithAuth.get('/uploads/unemployment')
		return res.data.data
	},
	async getAgriculture() {
		const res = await axiosWithAuth.get('/uploads/agriculture/all')
		return res.data
	},
	async getWorkingDetail() {
		const res = await axiosWithAuth.get('/uploads/working/detail')
		return res.data.data
	},
	async getEnterprises() {
		const res = await axiosWithAuth.get('/uploads/enterprises')
		return res.data.data
	},
	async getSmallBusiness() {
		const res = await axiosWithAuth.get('/uploads/small_business')
		return res.data.data
	},
}
