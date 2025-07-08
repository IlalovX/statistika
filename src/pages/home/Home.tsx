import { Box, useTheme } from '@mui/material'
import CompaniesCard from './components/companiesCard/CompaniesCard'
import { default as GenderAgeCard } from './components/genderAgeCard/GenderAgeCard'
import HomeExportImport from './components/homeExportImport/HomeExportImport'
import HomeMapCard from './components/homeMapCard/HomeMapCard'
import HomePopulationCard from './components/homePopulationCard/HomePopultaionCard'
import HomeUnemployersСard from './components/homeUnemployersCard/HomeUnemployersCard'
import EmploymentCard from './components/jobsCard/EmploymentCard'
import PovertyCard from './components/povertyCard/PovertyCard'
import ProfitCard from './components/profitCard/ProfitCard'
import SalaryCard from './components/salaryCard/SalaryCard'
import SmallBusinessCard from './components/smallBusinessCard/SmallBusinessCard'

function Home() {
	const theme = useTheme()

	return (
		<div>
			<section className='grid grid-cols-[1fr_0.8fr_1.2fr_1fr] grid-rows-[400px] gap-3'>
				<HomeMapCard />
				<div className='grid grid-cols-1 grid-rows-2 gap-2'>
					<HomePopulationCard />
					<HomeUnemployersСard />
				</div>
				<div className='col-span-2 flex flex-col box-border gap-3'>
					<div className='grid grid-cols-[1fr_0.8fr_1.2fr] gap-3 grid-rows-1'>
						<GenderAgeCard />
						<PovertyCard />
						<SalaryCard />
					</div>
					<div className='grid grid-cols-[1.6fr_1.4fr] grid-rows-1 gap-3'>
						<EmploymentCard />
						<ProfitCard />
					</div>
				</div>
			</section>
			<section className='grid grid-cols-4 gap-2 mt-3'>
				<CompaniesCard />
				<SmallBusinessCard />
				<Box
					className='shadow-xl rounded-2xl p-4 col-span-2 grid-cols-1 grid'
					sx={{
						bgcolor: 'background.paper',
						border: `1px solid ${theme.palette.divider}`,
					}}
				>
					<HomeExportImport />
				</Box>
			</section>
		</div>
	)
}

export default Home
