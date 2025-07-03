import { Box, Typography } from '@mui/material'
import { Gauge, gaugeClasses } from '@mui/x-charts'

const settings = {
	width: 175,
	height: 175,
	value: 70,
}

export default function HomeGauge() {
	return (
		<Box position='relative' display='inline-block'>
			<Gauge
				{...settings}
				cornerRadius='50%'
				sx={theme => ({
					[`& .${gaugeClasses.valueText}`]: {
						display: 'none', // Скрываем стандартное число
					},
					[`& .${gaugeClasses.valueArc}`]: {
						fill: '#52b202',
					},
					[`& .${gaugeClasses.referenceArc}`]: {
						fill: theme.palette.text.disabled,
					},
				})}
			/>
			{/* Кастомный текст в центре */}
			<Box
				position='absolute'
				top='50%'
				left='50%'
				sx={{
					transform: 'translate(-50%, -50%)',
					textAlign: 'center',
				}}
			>
				<Typography variant='h6' color='primary'>
					 {settings.value}
					 <br />
					 <Typography color="success" fontWeight="bold">Всего</Typography>
				</Typography>
			</Box>
		</Box>
	)
}
