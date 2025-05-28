import './index.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from './sections/Home/Home';
import Layout from './sections/Layout/Layout';
import CategoryProducts from './sections/Home/CategoryProducts/CategoryProducts';
import { fetchProducts } from "./redux/productSlice";
import { fetchCategories } from "./redux/categorySlice";
import { fetchBrands } from "./redux/brandSlice";
import { fetchSubcategories } from "./redux/subcategorySlice";
import { fetchStaticValues } from "./redux/staticValuesSlice";
import { fetchUserProfile } from "./redux/authSlice";
import { fetchReviews } from "./redux/reviewSlice";
import { logoutUser, setUser } from "./redux/authSlice";
// import { checkUserStatus } from "./redux/authSlice";
import Shop from './sections/Shop/Shop';
import Wishlist from './components/Wishlist/Wishlist';
import Cart from './components/Cart/Cart';
import Earrings from './sections/Earrings/Earrings';
import Necklaces from './sections/Necklaces/Necklaces';
import Contact from './sections/Contact/Contact';
import MyAccount from './components/MyAccount/MyAccount';
import SingleProduct from './components/Products/SingleProduct';
import axios from 'axios';
import Checkout from './components/Checkout/Checkout';
import OrderSuccess from './components/OrderSucess/OrderSucess';
import Profile from './components/Profile/Profile';
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage';
import ForgotPassword from './components/MyAccount/ForgotPassword';
import ResetPassword from './components/MyAccount/ResetPassword';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile()); // Fetch user data when app loads
    dispatch(fetchProducts()); // Fetch products when the app loads
    dispatch(fetchCategories());  // Fetch categories on app load
    dispatch(fetchBrands());  // Fetch brands on app load
    dispatch(fetchSubcategories());  // Fetch subcategories on app load 
    dispatch(fetchStaticValues());  // Fetch static values on app load
    dispatch(fetchReviews());
    
    // console.log("Fetching user profile...");
    // dispatch(checkUserStatus()); // ✅ Now Redux handles user authentication

  }, [dispatch]);
// console.log("fetch user profile", fetchUserProfile);
  const state = useSelector((state) => state);
  // console.log("Redux State:", state);



  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryProducts />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/earrings" element={<Earrings />} />
          <Route path="/necklaces" element={<Necklaces />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/search" element={<SearchResultsPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />





        </Route>
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/order-success" element={<OrderSuccess />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
