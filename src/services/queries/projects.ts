import { useQuery } from '@tanstack/react-query'
import { axiosClassic } from '../../api/axios'
import { ProjectsErrorType, ProjectSuccessType } from '../../types/queries'

export const getProjects = () => {
	return useQuery<ProjectSuccessType[], ProjectsErrorType>({
		queryKey: ['getProjects'],
		queryFn: async () => {
			const res = await axiosClassic.get(
				'/projects/?skip=0&limit=100&include_deleted=false'
			)
			return res.data
		},
	})
}