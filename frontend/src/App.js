import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "./components/Navbar";
import Success from "./components/Success";
import Order from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  const [showCart, setshowCart] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();
  if (showCart) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  useEffect(() => {
    if (location.pathname === "login" || "register") {
      setShowNav(false);
    }
  }, [location]);

  return (
    <>
      <ToastContainer />
      <Container>
        {setShowNav && <Navbar setshowCart={setshowCart} showCart={showCart} />}
        <Routes>
          <Route exact path="/" element={<Home setshowCart={setshowCart} />} />
          <Route exact path="/products/:category" element={<ProductList />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route
            exact
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/order/success"
            element={user ? <Success /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={user ? <Order /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/wishlist"
            element={
              user ? (
                <Wishlist setshowCart={setshowCart} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/blog" element={<Blog />} />
        </Routes>
        {showCart && (
          <Elements stripe={stripePromise}>
            <Cart setshowCart={setshowCart} />
          </Elements>
        )}
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  position: relative;
`;
