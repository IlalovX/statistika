import { useQuery } from '@tanstack/react-query'
import { ProjectsStatusesForm } from '../types/projects-statuses.interface'
import { ProjectsStatusesService } from '../services/projects-statuses.service'

export function useGetProjectsStatusesList() {
	return useQuery<ProjectsStatusesForm[]>({
		queryKey: ['projects_status_list'],
		queryFn: () => ProjectsStatusesService.getStatusesList(),
	})
}
