import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material'

import { default as icon } from '../../../public/туризм.svg'

const data = [
	{ id: 1, title: 'IT фирмы', value: 20, percent: '+0.24%' },
	{ id: 2, title: 'Бизнес', value: 20, percent: '+0.24%' },
	{ id: 3, title: 'Бизнес', value: 20, percent: '+0.24%' },
	{ id: 4, title: 'Бизнес', value: 20, percent: '+0.24%' },
	{ id: 5, title: 'Бизнес', value: 20, percent: '+0.24%' },
]

function HomeList() {
	return (
		<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			{data.map(item => (
				<ListItem
					key={item.id}
					sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 0 }}
				>
					<ListItemAvatar>
						<Avatar sx={{ bgcolor: '#F3F4F6' }}>
							<img src={icon} alt='icon' width={24} height={24} />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={item.title}
						primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
					/>
					<Typography variant='body1' fontWeight={600}>
						{item.value}
					</Typography>
					<Typography variant='body2' color='green'>
						{item.percent}
					</Typography>
				</ListItem>
			))}
		</List>
	)
}

export default HomeList
