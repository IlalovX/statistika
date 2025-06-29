import { useQuery } from '@tanstack/react-query'
import { ProjectsService } from '../services/projects.service'
import { ProjectsStatusesForm } from '../types/projects-statuses.interface'
import { GetProjects, ProjectSearchParams } from '../types/projects.interface'
import { Region } from '../types/region.interface'

export function useGetProjectsList() {
	return useQuery<GetProjects[]>({
		queryKey: ['projects_list'],
		queryFn: ProjectsService.getProjectsList,
	})
}

export function useGetProjectDetail(id: string | number) {
	return useQuery({
		queryKey: ['project_detail', id],
		queryFn: () => ProjectsService.getProjectsDetail(id),
		enabled: !!id, // Запрос выполняется только если ID есть
	})
}

export function useGetProjectOverallStatus(id: string | number) {
	return useQuery({
		queryKey: ['project_overall_status', id],
		queryFn: () => ProjectsService.getProjectsOverallStatusDetail(id),
		enabled: !!id,
	})
}

export function useGetProjectsLastUpdate() {
	return useQuery({
		queryKey: ['projects_last_update'],
		queryFn: ProjectsService.getProjectsLastUpdate,
	})
}

export function useProjectsSearch(params: ProjectSearchParams) {
	return useQuery({
		queryKey: ['projects_search', params],
		queryFn: () => ProjectsService.getProjectsSearch(params),
		enabled: Object.keys(params).some(
			key => params[key as keyof ProjectSearchParams] !== null
		),
	})
}

export function useGetProjectsRegionList() {
	return useQuery<Region[]>({
		queryKey: ['projects_region_list'],
		queryFn: () => ProjectsService.getProjectsRegionList(),
	})
}

export function useGetProjectsStatusList() {
	return useQuery<ProjectsStatusesForm[]>({
		queryKey: ['projects_status_list'],
		queryFn: () => ProjectsService.getProjectsStatusList(),
	})
}
