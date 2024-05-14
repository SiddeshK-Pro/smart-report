import HeroSection from '../components/HeroSection'
import TestListing from '../components/TestListing'
import HistoryNotice from '../components/HistoryNotice'
import Navigation from '../components/Navigation'

const Dashboard = () => {

	return (
		<div>
			<Navigation />
			<HeroSection />
			<TestListing />
			<HistoryNotice />
		</div>
	)
}

export default Dashboard
