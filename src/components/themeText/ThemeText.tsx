import { Typography, useTheme } from '@mui/material'

export default function ThemeText({
	text,
	variant,
}: {
	text: string
	variant: string
}) {
	const theme = useTheme()

	return (
		<Typography
			variant={`${variant}`}
			sx={{
				color: theme.palette.mode === 'light' ? '#355CBF' : 'white',
			}}
		>
			{text}
		</Typography>
	)
}
