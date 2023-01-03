import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { clearCart } from "../redux/cartRedux";

const Success = () => {
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Container>
      <Wrapper>
        <img src="/img/verified.gif" alt="" />
        <span>Order Succesfully Placed</span>
        <Details>
          <span>
            <b>OrderId:</b> {data._id}
          </span>
          <Images>
            {data?.products.map((p) => {
              return <img src={p.img} alt="" />;
            })}
          </Images>
          <span>
            <b>Amount:</b> ${data.amount}
          </span>
          <Buttons>
            <Link to="/orders">
              <Button>SEE ALL ORDERS</Button>
            </Link>
            <Link to="/">
              <Button>GO TO HOME</Button>
            </Link>
          </Buttons>
        </Details>
      </Wrapper>
    </Container>
  );
};

export default Success;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  transform: ease-in-out 2s;
  z-index: 999;
  position: absolute;
  left: 0;
  top: ${(props) => props.fromTop}px;
`;

const Wrapper = styled.div`
  padding: 30px 40px;
  width: 32%;
  height: 85%;
  position: absolute;
  top: 9%;
  left: 30%;
  background: #f4f4f4;
  z-index: 9999;
  transition: ease-in-out 2s;
  border-radius: 8px;
  background: #f4f4f4, url("/img/celeb.gif") no-repeat center center/cover;
  background: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.4)
    ),
    url("/img/celeb.gif");
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px 20px;
    left: 2.5%;
    width: 95%;
    height: 90%;
  }

  img {
    width: 120px;

    @media (max-width: 768px) {
      width: 90px;
    }
  }

  span {
    font-size: 20px;
  }
`;

const Details = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 18px;
  }
`;

const Images = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;

  img {
    max-width: 80px;
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 8px 20px;
  background-color: #1d293f;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
`;
