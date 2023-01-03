import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { publicRequest, userRequest } from "../axiosRequest";
import { addPro } from "../redux/wishlistRedux";
import Newsletter from "../components/Newsletter";

const Container = styled.div`
  background-color: #f5f5f5;
  padding-top: 50px;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  );
  background-position: 200% 20%;
  background-repeat: no-repeat;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 50vh;
    max-width: 100%;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;

  @media (max-width: 768px) {
    padding: 0px 10px;
  }
`;

const Title = styled.h1`
  font-weight: 200;

  @media (max-width: 768px) {
    font-weight: 500;
    font-size: 18px;
    margin-top: 10px;
  }
`;

const Desc = styled.p`
  margin: 20px 0px;

  @media (max-width: 768px) {
    margin: 10px 0px;
  }
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  gap: 15px;

  @media (max-width: 768px) {
    margin: 18px 0px;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px 0px;
  min-width: 140px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin: 0 15px;

  &:hover {
    background-color: #f8f4f4;
  }

  @media (max-width: 768px) {
    padding: 6px 2px;
    min-width: 100px;
    font-size: 12px;
  }
`;

const Product = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const addToCart = async () => {
    if (user.user) {
      await userRequest.post(`/cart/${user.user._id}`, {
        Product: {
          ...product,
          quantity,
          color: color === "" ? product.color[0] : color,
          size: size === "" ? product.size[0] : size,
        },
        quantity,
        total: cart.total + quantity * product.price,
      });
      dispatch(
        addProduct({
          ...product,
          quantity,
          color: color === "" ? product.color[0] : color,
          size: size === "" ? product.size[0] : size,
        })
      );
    }
  };

  const addToWish = async () => {
    if (user.user) {
      try {
        await userRequest.post(`/wishlist/${user.user._id}`, {
          ...product,
        });
        dispatch(addPro({ ...product }));
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <Container img={product.img}>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() =>
                  setQuantity(quantity > 1 ? quantity - 1 : quantity)
                }
              />
              <Amount>{quantity}</Amount>
              <Add onClick={() => setQuantity(quantity + 1)} />
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
            <Button onClick={addToWish}>WISHLIST</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
