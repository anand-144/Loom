import BestSeller from "../components/BestSeller"
import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import NewsLetterBox from "../components/NewsLetterBox"
import OurPolicy from "../components/OurPolicy"
import SaleBanner from "../components/SaleBanner"


const Home = () => {
  return (
    <div>
      <SaleBanner/>
      <Hero/>
      <LatestCollection />
      <BestSeller />
      <OurPolicy/>
      <NewsLetterBox />
    </div>
  )
}

export default Home
