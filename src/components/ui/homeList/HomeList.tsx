import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material'

import { default as icon } from '/svg/туризм.svg'

const data = [
	{ id: 1, title: 'Бизнес', value: 20, percent: '+0.24%' },
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
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						padding: '0 0 0 2px',
						margin: '4px 0',
					}}
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
					<Typography variant='body1' fontWeight={600} className='text-[20px]'>
						{item.value}
					</Typography>
					<Typography variant='body2' color='green' className='text-[11px]'>
						{item.percent}
					</Typography>
				</ListItem>
			))}
		</List>
	)
}

export default HomeList
