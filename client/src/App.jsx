import React, { useEffect } from "react";
import Home from "./pages/Home"
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "./redux/cartRedux";

const App = () => {
  const user = useSelector( (state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user._id));
    }
  }, [user, dispatch]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart/" element={<Cart />} />
        <Route path="/success/" element={<Success />} />
        <Route path="/login/" element={user ? <Navigate to = "/"/> : <Login />} />
        <Route path="/register/" element={user ? <Navigate to = "/"/> : <Register />} />
      </Routes>
    </Router>
  );
};

export default App;