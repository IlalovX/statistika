import { AxiosError } from 'axios'

export interface ProjectSuccessType {
	region_id: number
	initiator: string
	name: string
	budget_million: number
	jobs_created: number
	completion_date: string
	authority_id: number
	status_id: number
	general_status: string
	id: number
	deleted_at: string
	created_at: string
	updated_at: string
}

export type ProjectsErrorType = AxiosError<{
	message: { [key: string]: string }
}>

export interface RegionsSuccessType {
	name: string
	stat_code: number
	id: number
	deleted_at: string | null
}

export type RegionsErrorType = AxiosError<{
	message: { [key: string]: string }
}>
export interface StatusesSuccessType {
	name: string
	id: number
	deleted_at: string
}

export type StatusesErrorType = AxiosError<{
	message: { [key: string]: string }
}>

export interface AuthoritiesSuccessType {
	name: string
	id: number
	deleted_at: string
}

export type AuthoritiesErrorType = AxiosError<{
	message: { [key: string]: string }
}>
export interface UsersSuccessType {
	username: string
	is_active: boolean
	id: number
	is_superadmin: boolean
	created_at: string
	deleted_at: string
	regions: {
		name: string
		stat_code: number
		id: number
		deleted_at: string
	}
}

export type UsersErrorType = AxiosError<{
	message: { [key: string]: string }
}>

export interface LastUpdateSuccessType {
	last_update: null | string
}

export type LastUpdateErrorType = AxiosError<{
	message: { [key: string]: string }
}>

export interface GetFiltersProjectsData {
	region_id?: string
	budget_min?: string | number
	budget_max?: string | number
	status_id?: string
}

export interface GetTouristData {
	[year: string]: {
		[month: string]: number
	}
}
