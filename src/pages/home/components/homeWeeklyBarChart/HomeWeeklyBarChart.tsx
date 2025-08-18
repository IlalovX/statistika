const data = [
	{ day: 'Пн', value: 20 },
	{ day: 'Вт', value: 35 },
	{ day: 'Ср', value: 50 },
	{ day: 'Чт', value: 40 },
	{ day: 'Пт', value: 60 },
	{ day: 'Сб', value: 30 },
	{ day: 'Вс', value: 25 },
]
function HomeWeeklyBarChart() {
	return (
		<div className='grid grid-cols-7 min-h-[180px] gap-x-2.5 gap-y-0.5'>
			{data.map((item, index) => (
				<div
					className={`h-[100%] flex flex-col items-end justify-end gap-1.5`}
					key={index}
				>
					<div
						className={`bg-gray-300  w-full rounded-xs hover:bg-blue-500 cursor-pointer`}
						style={{ height: `${item.value}%` }}
					></div>
					<p className='text-center text-gray-400'>{item.day}</p>
				</div>
			))}
		</div>
	)
}

export default HomeWeeklyBarChart
