import { MenuItem, TextField } from '@mui/material'

interface YearSelectProps {
	value: number
	onChange: (value: number) => void
	years?: number[]
}

export const YearSelect = ({
	value,
	onChange,
	years = [2023, 2024, 2025],
}: YearSelectProps) => {
	return (
		<TextField
			select
			label='Год'
			value={value}
			onChange={e => onChange(Number(e.target.value))}
			sx={{ width: 120 }}
		>
			{years.map(year => (
				<MenuItem key={year} value={year}>
					{year}
				</MenuItem>
			))}
		</TextField>
	)
}
