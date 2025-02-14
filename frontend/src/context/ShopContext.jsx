import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [discount, setDiscount] = useState({
    active: false,
    discountPercentage: 0,
  });
  const [selectedSeason, setSelectedSeason] = useState('Winter'); // Default season
  const navigate = useNavigate();

  const seasons = ["Winter", "Summer", "Autumn", "Spring"];

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/discount`);
        if (response.data && response.data.discount) {
          setDiscount(response.data.discount);
        }
      } catch (error) {
        console.error("Error fetching discount:", error);
      }
    };

    fetchDiscount();
  }, [backendUrl]);

  const getSeasonalProducts = (season) => {
    return products.filter(product => product.seasonal === season);
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size before adding to cart!");
      return;
    }

    let cartData = { ...cartItems };

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
        toast.success("Product added to cart!");
      } catch (error) {
        console.error(error);
        toast.error("Error adding product to cart!");
      }
    } else {
      toast.info("Product added locally (please log in for full functionality)");
    }
  };

  const updateCartItemQuantity = async (itemId, size, quantity) => {
    let cartData = { ...cartItems };

    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
    }

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((totalCount, sizes) => {
      return totalCount + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((totalAmount, [itemId, sizes]) => {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) return totalAmount;

      const effectivePrice =
        discount && discount.active && discount.discountPercentage > 0
          ? itemInfo.price - (itemInfo.price * discount.discountPercentage) / 100
          : itemInfo.price;

      return totalAmount + Object.entries(sizes).reduce((sum, [, qty]) => {
        return sum + effectivePrice * qty;
      }, 0);
    }, 0);
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      toast.error('Error fetching products. Please try again later.');
      console.error(error);
    }
  };

  const getUserCart = async (token) => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateCartItemQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    discount,
    setDiscount,
    seasons,
    selectedSeason,
    setSelectedSeason,
    getSeasonalProducts,
    getProductsByCategory,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
