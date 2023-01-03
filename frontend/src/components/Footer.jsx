import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 60px;

  .logo {
    margin-bottom: 30px;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 20px;
  }

  p {
    font-size: 14x;
    padding-bottom: 8px;
  }

  a {
    font-size: 14px;
    text-decoration: none;
    color: #222;
    margin-bottom: 10px;
  }

  .install {
    margin: 10px 0 15px 0;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Pay = styled.div`
  img {
    border: 1px solid #088178;
    margin-right: 4px;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;

  a {
    font-size: 15px;
  }
`;

const Follow = styled.div`
  margin-top: 20px;
`;

const CopyRight = styled.div`
  width: 100%;
  text-align: center;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Footer = () => {
  return (
    <Container>
      <Col>
        <img class="logo" src="img/logo.png" alt="" />
        <h4>Contact</h4>
        <p>
          <strong>Address:</strong> 450 Serra Mall, Stanford, CA 94305, United
          States
        </p>
        <p>
          <strong>Phone:</strong> (+91) 01 2345 6789 /+01 2222 365
        </p>
        <p>
          <strong>Hours:</strong> 10:00 - 18:00, Mon - Sat
        </p>
        <Follow>
          <h4>Follow us</h4>
          <a
            href="https://youtu.be/tZ94EqaeEtg"
            target="_blank"
            rel="noreferrer"
          >
            <SocialContainer>
              <SocialIcon color="3B5999">
                <Facebook />
              </SocialIcon>
              <SocialIcon color="E4405F">
                <Instagram />
              </SocialIcon>
              <SocialIcon color="55ACEE">
                <Twitter />
              </SocialIcon>
              <SocialIcon color="E60023">
                <YouTube />
              </SocialIcon>
            </SocialContainer>
          </a>
        </Follow>
      </Col>
      <Col>
        <h4>Products</h4>
        <Link to="/products/men">
          <a href="#">Men</a>
        </Link>
        <Link to="/products/women">
          <a href="#">Women</a>
        </Link>
        <Link to="/products/watches">
          <a href="#">Hand Accessories</a>
        </Link>
        <Link to="/products/casual">
          <a href="#">Casual</a>
        </Link>
        <Link to="/products/footwear">
          <a href="#">Footwear</a>
        </Link>
        <Link to="/products/luxury">
          <a href="#">Luxury</a>
        </Link>
        <Link to="/products/shirt">
          <a href="#">Shirt</a>
        </Link>
        <Link to="/products/luxury">
          <a href="#">Luxury</a>
        </Link>
      </Col>
      <Col>
        <h4>My Account</h4>
        <Link to="/login">
          <a href="#">Sign In</a>
        </Link>
        <Link to="/cart">
          <a href="#">View Cart</a>
        </Link>
        <Link to="/wishlist">
          <a href="#">My Wishlist</a>
        </Link>
        <Link to="/orders">
          <a href="#">Track My Order</a>
        </Link>
        <Link to="/contact">
          <a href="#">Contact Us</a>
        </Link>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
      </Col>
      <Col class="install">
        <h4>Install App</h4>
        <p>From Play Store or Google Play</p>
        <Pay>
          <img src="img/app.jpg" alt="" />
          <img src="img/play.jpg" alt="" />
        </Pay>
        <p>Secured Payment Gateways</p>
        <img src="img/pay.png" alt="" />
      </Col>
      <CopyRight class="copyright">
        <p> Ⓒ 2022, FashionX etc - Fashion Ecommerce Store</p>
      </CopyRight>
    </Container>
  );
};

export default Footer;
