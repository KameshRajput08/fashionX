import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { persistor } from "../redux/store";
import {
  FacebookOutlined,
  Instagram,
  LoginOutlined,
  ShoppingCartOutlined,
  Twitter,
  LogoutOutlined,
  FavoriteBorderOutlined,
  WidgetsOutlined,
  YouTube,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { toast } from "react-toastify";
import SideMenu from "./Menu";

const Navbar = ({ setshowCart, showCart }) => {
  const user = useSelector((state) => state.user.currentUser);
  const Quantity = useSelector((state) => state.cart.quantity);
  const [unique, setUnique] = useState(false);
  const [showMenu, setshowMenu] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = () => {
    try {
      persistor.purge();
      navigate("/");
      window.location.reload();
      toast.success("Successfully logged out");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const location = useLocation()?.pathname;

  window.onscroll = () => {
    window.pageYOffset === 0 && location === "/"
      ? setUnique(true)
      : setUnique(false);
  };

  useEffect(() => {
    location === "/" ? setUnique(true) : setUnique(false);
  }, [location]);

  useEffect(() => {
    showMenu || showCart
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [showMenu]);

  return (
    <>
      <Container unique={unique}>
        <Wrapper>
          <Logo>
            <WidgetsOutlined
              onClick={() => setshowMenu(true)}
              className="menu"
            />
            <img src="/img/logo.png" alt="" />
          </Logo>
          <Menu unique={unique}>
            <Link to="/" className="link">
              <span>Home</span>
            </Link>
            <Link to="/products" className="link">
              <span>Products</span>
            </Link>
            <Link to="/contact" className="link">
              <span>Contact</span>
            </Link>
            <Link to="/wishlist" className="link">
              <FavoriteBorderOutlined />
              <span>Wishlist</span>
            </Link>
            <div
              onClick={() => (user ? setshowCart(true) : navigate("/login"))}
              className="link"
            >
              <Badge badgeContent={Quantity} color="secondary" fontSize="small">
                <ShoppingCartOutlined />
              </Badge>
              <span>Cart</span>
            </div>
          </Menu>
          <Links>
            <FacebookOutlined fontSize="small" className="icon" />
            <Instagram fontSize="small" className="icon" />
            <Twitter fontSize="small" className="icon" />
            {user ? (
              <LogoutOutlined fontSize="large" onClick={handleSignOut} />
            ) : (
              <LoginOutlined
                fontSize="large"
                onClick={() => navigate("/login")}
              />
            )}
          </Links>
        </Wrapper>
      </Container>
      {showMenu && (
        <SideMenu setshowMenu={setshowMenu} setshowCart={setshowCart} />
      )}
    </>
  );
};

export default Navbar;

const Container = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 65px;
  z-index: 999;
  color: ${({ unique }) => (unique ? "#fff" : "#000")};
  background-color: ${({ unique }) => (unique ? "transparent" : "#fff")};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;

  .menu {
    margin-right: 10px;
    font-size: 2rem;
    cursor: pointer;
    color: #aa6c39;
  }

  img {
    width: 180px;
    object-fit: cover;
  }
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 26px;
  color: ${({ unique }) => (unique ? "#fff" : "#000")};

  .link {
    text-decoration: none;
    color: ${({ unique }) => (unique ? "#fff" : "#000")};
    display: flex;
    align-items: center;
    gap: 3px;
    cursor: pointer;

    span {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 10px;

  & > * {
    cursor: pointer;
  }

  .icon {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
