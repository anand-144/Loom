import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  Collections,
  About,
  Contact,
  Product,
  Cart,
  Login,
  PlaceOrder,
  Orders,
  PrivacyPolicy,
  DeliveryPartner,
  Team,
} from "./pages/";
import SeasonalWearPage from "./pages/SeasonalWearPage"; // Import the SeasonalWearPage
import Navbar from "./components/Navbar";
import Exchange from "./pages/Exchange";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import ShopContextProvider from "./context/ShopContext";
import DiscountBanner from "./components/DiscountBanner";
import SizeChart from "./components/SizeChart";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();

  return (
    <ShopContextProvider>
      <div className="w-full min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-br from-white to-gray-50">
        <ToastContainer />
        {location.pathname === "/" && <DiscountBanner />}
        <Navbar />
        <SearchBar />
        <main className="flex-grow container mx-auto px-4 sm:px-[5%] md:px-[7%] lg:px-[9%] py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/deliverypartner" element={<DeliveryPartner />} />
            <Route path="/team" element={<Team />} />
            <Route path="/size-chart/:gender" element={<SizeChart />} />
            <Route path="/seasonal-wear" element={<SeasonalWearPage />} />  {/* New Route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </ShopContextProvider>
  );
};

export default App;
