import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 60px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 500px) {
    padding: 15px;
  }

  h1 {
    font-size: 35px;
    font-weight: 400;
    margin-bottom: 25px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const Item = styled.div`
  width: 160px;
  text-align: center;
  padding: 25px 15px;
  box-shadow: 20px 20px 34px rgba(0, 0, 0, 0.06);
  border: 1px solid #cce7d0;
  border-radius: 5px;
  margin: 15px 0;

  &:hover {
    box-shadow: 10px 10px 55px rgba(70, 62, 221, 0.01);
  }

  img {
    width: 100%;
    margin-bottom: 10px;
  }

  h6 {
    display: inline-block;
    padding: 9px 8px 6px 8px;
    line-height: 1;
    border-radius: 5px;
    color: #088178;
    background: #fddde4;
  }
`;

const Whyus = () => {
  return (
    <Container>
      <h1>Why Choose Us</h1>
      <Wrapper>
        <Item class="fea-box">
          <img src="img/features/f1.png" alt="" />
          <h6>Free Shipping</h6>
        </Item>
        <Item class="fea-box">
          <img src="img/features/f2.png" alt="" />
          <h6>Online order</h6>
        </Item>
        <Item class="fea-box">
          <img src="img/features/f3.png" alt="" />
          <h6>Save money</h6>
        </Item>
        <Item class="fea-box">
          <img src="img/features/f4.png" alt="" />
          <h6>Promotions</h6>
        </Item>
        <Item class="fea-box">
          <img src="img/features/f5.png" alt="" />
          <h6>Happy sell</h6>
        </Item>
        <Item class="fea-box">
          <img src="img/features/f6.png" alt="" />
          <h6>24/7 Support</h6>
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Whyus;
