import { Typography } from '@mui/material'
import ThemeText from '../../../components/ui/ThemeText'
import { GroupData } from '../../../types/tourism.interface'
import SubGroups from './SubGroups'

interface Props {
	group: GroupData
}

function Groups({ group }: Props) {
	return (
		<div className='my-5'>
			<ThemeText variant='h4' text={group.group_name} />
			<Typography variant='h6' color='gray'>
				с начало месяца
			</Typography>
			<div className='grid grid-cols-5 gap-4 my-5'>
				{group.group_items?.map((subgroup) => (
					<SubGroups subgroup={subgroup} key={subgroup.subgroup_name} />
				))}
			</div>
		</div>
	)
}

export default Groups
