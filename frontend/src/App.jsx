import { Routes, Route } from "react-router-dom";
import { Home, Collections, About, Contact, Product, Cart, Login, PlaceOrder, Orders, PrivacyPolicy, DeliveryPartner} from "./pages/";
import Navbar from "./components/Navbar";
import Exchange from "./pages/Exchange";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5%] md:px-[7%] lg:px-[9%]'>
      <ToastContainer/>
      <Navbar />
      <SearchBar />
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
        <Route path = "/exchange" element={<Exchange />} />
        <Route path = "/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path = "/DeliveryPartner" element={<DeliveryPartner />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
