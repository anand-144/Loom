import { useEffect } from "react";
import { toast } from "react-toastify";
import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsLetterBox from "../components/NewsLetterBox";
import OurPolicy from "../components/OurPolicy";

const Home = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const welcomeShown = localStorage.getItem("welcomeShown");

    // Show the welcome toast only if the user exists and it hasn't been shown yet
    if (user.name && !welcomeShown) {
      toast.success(`Welcome, ${user.name}! 👋`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Set the flag so that the message is not shown again during this session
      localStorage.setItem("welcomeShown", "true");
    }
  }, []);

  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
