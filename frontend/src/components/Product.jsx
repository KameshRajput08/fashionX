import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  Favorite,
} from "@mui/icons-material";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../axiosRequest";
import { useDispatch, useSelector } from "react-redux";
import { addPro, removePro } from "../redux/wishlistRedux";
import { addProduct } from "../redux/cartRedux";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/Spinner";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  max-width: ${({ sm }) => (sm ? "230px" : "300px")};
  min-width: ${({ sm }) => (sm ? "200px" : "280px")};
  height: ${({ sm }) => (sm ? "280px" : "350px")};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item, sm }) => {
  const user = useSelector((state) => state.user.currentUser?.user);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.Wishlist);
  const [isliked, setIsliked] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = async () => {
    try {
      setloading(true);
      await userRequest.put(`/wishlist/${user._id}/${item._id}`);
      setloading(false);
      dispatch(removePro(item._id));
      setIsliked(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async () => {
    setloading(true);
    if (user) {
      setloading(true);
      await userRequest.post(`/cart/${user._id}`, {
        Product: {
          ...item,
          quantity: 1,
          color: item.color[0],
          size: item.size[0],
        },
        quantity: 1,
        total: cart.total + item.price,
      });
      dispatch(addProduct({ ...item, quantity: 1 }));
      setloading(false);
    } else {
      navigate("/login");
    }
  };

  const addToWishlist = async () => {
    if (user) {
      setloading(true);
      try {
        const index = wishlist.products.findIndex((p) => p._id === item._id);
        if (index === -1) {
          await userRequest.post(`/wishlist/${user._id}`, {
            ...item,
          });
          dispatch(addPro({ ...item }));
          setloading(false);
        }
      } catch (err) {
        console.log(err.message);
        setloading(false);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    wishlist.products.forEach((p) => {
      p._id === item._id && setIsliked(true);
    });
  }, [handleRemove, addToWishlist]);

  return (
    <Container sm={sm}>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={addToCart} />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          {isliked ? (
            <Favorite onClick={handleRemove} />
          ) : (
            <FavoriteBorderOutlined onClick={addToWishlist} />
          )}
        </Icon>
      </Info>
      {loading && <LoadingSpinner />}
    </Container>
  );
};

export default Product;
