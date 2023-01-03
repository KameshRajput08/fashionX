import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { publicRequest } from "../axiosRequest";

const Container = styled.div`
  text-align: center;
  padding: 50px 20px;

  h1 {
    font-size: 35px;
    font-weight: 400;
    margin-bottom: 25px;

    @media (max-width: 768px) {
      font-size: 26px;
      font-weight: 500;
      margin-bottom: 16px;
    }
  }

  @media (max-width: 768px) {
    padding: 50px 70px;
  }

  @media (max-width: 468px) {
    padding: 50px 20px;
  }
`;

const Wrapper = styled(Slider)`
  padding: 0px 30px;
  overflow: hidden;
  align-self: center;
  & > button {
    opacity: 1;
    height: 100%;
    width: 5vw;
    z-index: 9;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  @media (max-width: 768px) {
    padding: 70px 100px;
  }

  @media (max-width: 600px) {
    padding: 70px 20px;
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }
  li.slick-active button:before {
    color: #000;
  }
  .slick-list {
    overflow: initial;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    color: #000;
  }
  .slick-prev {
    left: 4px;
  }
  .slick-next {
    right: 4px;
  }
`;

const ProSlider = () => {
  const [products, setProducts] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: window.innerWidth < 768 ? 1 : 4,
    slidesToScroll: window.innerWidth < 768 ? 1 : 4,
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  return (
    <Container>
      <h1>Our Best Selling Products</h1>
      <Wrapper {...settings}>
        {products.map((item) => (
          <Product key={item._id} item={item} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default ProSlider;
