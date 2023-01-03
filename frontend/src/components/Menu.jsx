import {
  CloseOutlined,
  FacebookOutlined,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Menu = ({ setshowMenu, setshowCart }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Container fromTop={window.pageYOffset}>
      <Wrapper>
        <Logo>
          <img src="/img/FX.png" alt="" />
        </Logo>
        <MenuCon>
          <Link to="/" className="link" onClick={() => setshowMenu(false)}>
            <span>Home</span>
          </Link>
          <Link
            to="/products"
            className="link"
            onClick={() => setshowMenu(false)}
          >
            <span>Products</span>
          </Link>
          <Link
            to="/contact"
            className="link"
            onClick={() => setshowMenu(false)}
          >
            <span>Contact</span>
          </Link>
          <Link to="/blog" className="link" onClick={() => setshowMenu(false)}>
            <span>Blog</span>
          </Link>
          <Link
            to="/wishlist"
            className="link"
            onClick={() => setshowMenu(false)}
          >
            <span>Wishlist</span>
          </Link>
          <div
            onClick={() => {
              user ? setshowCart(true) : navigate("/login");
              setshowMenu(false);
            }}
            className="link"
          >
            <span>Cart</span>
          </div>
          <Link
            to="/orders"
            className="link"
            onClick={() => setshowMenu(false)}
          >
            <span>Orders</span>
          </Link>
        </MenuCon>
        <Social>
          <a href="https://youtu.be/6AvvcbqiIpE" target="_blank">
            <Icons>
              <FacebookOutlined fontSize="small" />
              <Twitter fontSize="small" />
              <YouTube fontSize="small" />
            </Icons>
          </a>
          <p>Copyright Ⓒ 2022, FashX</p>
          <span>Website by Kamesh Rajput</span>
        </Social>
        <CloseOutlined className="close" onClick={() => setshowMenu(false)} />
      </Wrapper>
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: ${(props) => {
    const pathname = useLocation().pathname;
    if (pathname === "/blog" || pathname === "/contact") {
      return props.fromTop - 65;
    } else {
      return props.fromTop;
    }
  }}px;
  left: 0;
  z-index: 999;
  transform: 5s ease-in;
`;

const Wrapper = styled.div`
  width: 26%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 25px;
    color: #818181;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  img {
    max-width: 200px;
    object-fit: cover;
  }
  padding-bottom: 8px;
`;

const MenuCon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-bottom: 2px solid #454545;
  border-top: 2px solid #454545;

  .link {
    text-decoration: none;
    color: #fff;
  }
  span {
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 1.8px;

    &:hover {
      color: #aa6c39;
    }
  }
`;

const Social = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  letter-spacing: 1.5px;

  a {
    color: #fff;
  }

  p {
    font-size: 13px;
    margin-bottom: 10px;
  }

  span {
    font-size: 12px;
    color: #7e7c7c;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 22px;
`;
