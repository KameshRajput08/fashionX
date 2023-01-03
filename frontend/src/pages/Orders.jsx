import { useSelector } from "react-redux";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { userRequest } from "../axiosRequest.js";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding-top: 60px;
`;

const Wrapper = styled.div`
  padding: 40px 150px;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 6px solid lightgray;

  span {
    font-weight: 300;
    img {
      width: 22px;
      margin-left: 5px;
    }
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  outline: none;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
    font-weight: 400;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  border-bottom: 2px solid lightgray;
  padding: 18px;

  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
  }

  .close {
    position: absolute;
    right: 3%;
    top: 4%;
  }
`;

const ProductDetail = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 126px;
  height: 150px;

  @media (max-width: 768px) {
    width: 100px;
    height: 120px;
  }
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductName = styled.span`
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: flex-end;
  margin: 15px 20px;

  .cancel {
    padding: 6px 10px;
    margin-top: 20px;
  }
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 200;
`;

const ProductStatus = styled.div`
  font-size: 16px;
  font-weight: 400;

  span {
    font-size: 18px;
    font-weight: 600;
    color: #fd6d6b;
  }
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;

  @media (max-width: 768px) {
    padding: 10px;
  }

  .pay {
    width: 100%;
  }
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Order = () => {
  const user = useSelector((state) => state.user.currentUser.user);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState();
  const [amount, setamount] = useState(0);

  useEffect(() => {
    const getOrders = async () => {
      const res = await userRequest.get(`/orders/find/${user._id}`);
      res.data.forEach((o) => {
        setData(o);
        o.products.forEach((p) => {
          setamount((prevState) => prevState + p.price * p.quantity);
          setProducts((prevState) => [...prevState, p]);
        });
      });
    };
    getOrders();
  }, [user._id]);

  return (
    <Container fromTop={window.pageYOffset}>
      <Wrapper>
        <Top>
          <Title>YOUR ORDERS ({products.length})</Title>
          <Link to="/products">
            <Button>CONTINUE SHOPPING</Button>
          </Link>
        </Top>
        <Bottom>
          <Info>
            {products?.map((product) => {
              return (
                <Product>
                  <ProductDetail>
                    <Link to={`/product/${product._id}`}>
                      <Image src={product.img} />
                    </Link>
                    <Details>
                      <ProductName>
                        <h4>
                          <b>Id:</b> {product._id}
                        </h4>
                      </ProductName>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                      <ProductStatus>
                        Status: <span>{product.status}</span>
                      </ProductStatus>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <ProductAmount>{product.quantity}</ProductAmount>
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                    <Button className="cancel">CANCEL ORDER</Button>
                  </PriceDetail>
                </Product>
              );
            })}
          </Info>
          <Summary>
            <SummaryTitle>ORDERS OVERVIEW</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Order Id:</SummaryItemText>
              <SummaryItemPrice>{data?._id}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Total Number of Products:</SummaryItemText>
              <SummaryItemPrice>{products?.length}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Delivery Address:</SummaryItemText>
              <SummaryItemPrice>{data?.address}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total Amount:</SummaryItemText>
              <SummaryItemPrice>$ {amount}</SummaryItemPrice>
            </SummaryItem>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Order;
