import { MenuItem, TextField } from '@mui/material'

interface YearSelectProps {
	value: number
	onChange: (value: number) => void
	years?: number[]
}

export const YearSelect = ({
	value,
	onChange,
	years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016],
}: YearSelectProps) => {
	return (
		<TextField
			select
			label='Год'
			value={value}
			onChange={e => onChange(Number(e.target.value))}
			sx={{ width: 120 }}
			SelectProps={{
				MenuProps: {
					PaperProps: {
						style: {
							maxHeight: 4 * 40,
						},
					},
				},
			}}
		>
			{years.map(year => (
				<MenuItem key={year} value={year}>
					{year}
				</MenuItem>
			))}
		</TextField>
	)
}
