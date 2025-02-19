import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import PremiumCard from "../PremiumCard.jsx/PremiumCard";
import SuccessCount from "../SuccessCount/SuccessCount";
import SuccessStory from "../SuccessStory/SuccessStory";

const Home = () => {
  return (
    <div className="mt-20">
      <Banner />
      <PremiumCard />
      <HowItWorks />
      <SuccessCount />
      <SuccessStory />
    </div>
  );
};

export default Home;
