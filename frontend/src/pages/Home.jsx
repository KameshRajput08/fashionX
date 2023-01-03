import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import ProSlider from "../components/ProSlider";
import Slider from "../components/Slider";
import Whyus from "../components/Whyus";
import { getCart } from "../redux/cartRedux";
import { getWishlist } from "../redux/wishlistRedux";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser?.user);

  useEffect(() => {
    if (user) {
      dispatch(getCart());
      dispatch(getWishlist());
    }
  }, []);

  useEffect(() => {}, [window.pageYOffset]);

  return (
    <>
      <Container>
        <Slider />
        <Categories />
        <ProSlider />
        <Whyus />
        <Newsletter />
        <Footer />
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  position: relative;
  height: 100vh;
`;
