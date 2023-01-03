import { Add, CloseOutlined, EastOutlined, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { userRequest } from "../axiosRequest.js";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, removeProduct, updateQuantity } from "../redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import { useStripe } from "@stripe/react-stripe-js";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/Spinner";
import { toast } from "react-toastify";

const KEY = process.env.REACT_APP_STRIPE_KEY;

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
  padding: 20px;
  width: 45%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  overflow: scroll;
  z-index: 999;
  transition: ease-in-out 2s;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 6px solid lightgray;

  .icon {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  span {
    font-weight: 300;
    img {
      width: 22px;
      margin-left: 5px;
    }
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
  margin-bottom: 20px;
  position: relative;
  border-bottom: 2px solid lightgray;

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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 120px;

  @media (max-width: 768px) {
    width: 120px;
    height: 140px;
  }
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const ProductName = styled.span`
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
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

const NoProducts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 40px;

  span {
    font-size: large;
    font-weight: 400;
  }

  .add {
    width: 50%;
  }
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;

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
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #152238;
  color: white;
  font-weight: 600;
`;

const Cart = ({ setshowCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser.user);
  const [stripeToken, setStripeToken] = useState(null);
  const [clientSecret, setclientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPayBtn, setShowPayBtn] = useState(false);

  const handleToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setLoading(true);
        const res = await userRequest.post("/stripe/pay", {
          token: stripeToken,
          amount: cart.total,
        });
        setclientSecret(res.data.client_secret);
        await stripe.confirmCardPayment(res.data.client_secret, {
          payment_method: {
            type: "card",
            card: {
              id: stripeToken.card.id,
            },
          },
        });
        const data = await userRequest.post(`/orders/${user._id}`, {
          userId: user._id,
          products: cart.products,
          amount: cart.total,
          address: `${stripeToken?.card.address_zip}, ${stripeToken?.card.address_line1}, ${stripeToken.card?.address_city}, ${stripeToken.card.address_country}`,
          status: "pending",
        });

        setshowCart(false);
        setLoading(false);
        dispatch(clearCart());
        navigate("/order/success", { state: data.data });
      } catch (err) {
        console.log(err);
        toast.error("Payment Unsuccessful");
      }
    };
    stripeToken && sendRequest();
  }, [stripeToken]);

  const handleQuantity = async ({ pId, quantity }) => {
    try {
      if (quantity > 0 && quantity < 6) {
        userRequest.put(`/cart/product/quantity/${user._id}`, {
          pId,
          quantity,
        });
        dispatch(updateQuantity({ pId, quantity, userId: user._id }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async ({ index, product }) => {
    setLoading(true);
    await userRequest.put(`/cart/remove/${user._id}`, {
      productId: product._id,
      total: cart.total - product.quantity * product.price,
    });
    setLoading(false);
    dispatch(removeProduct({ index, product }));
  };

  return (
    <Container fromTop={window.pageYOffset}>
      <Wrapper>
        <Top>
          <EastOutlined
            className="icon"
            fontSize="large"
            onClick={() => setshowCart(false)}
          />
          <Title>YOUR BAG ({cart.products.length})</Title>
          <span>
            Congrats! You get free standard Shipping
            <img src="/img/tf.png" alt="" />
          </span>
        </Top>
        <Bottom>
          <Info>
            {cart?.products.map((product, index) => {
              return (
                <Product>
                  <CloseOutlined
                    onClick={() => handleClick({ index, product })}
                    className="close"
                  />
                  <ProductDetail>
                    <Link to={`/product/${product._id}`}>
                      <Image src={product.img} />
                    </Link>
                    <Details>
                      <ProductName>
                        <h4>{product.title}</h4>
                      </ProductName>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add
                        onClick={() =>
                          handleQuantity({
                            pId: product._id,
                            quantity: product.quantity + 1,
                          })
                        }
                      />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove
                        onClick={() =>
                          handleQuantity({
                            pId: product._id,
                            quantity: product.quantity - 1,
                          })
                        }
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              );
            })}
            {cart.products.length === 0 && (
              <>
                <NoProducts>
                  <span>No Products In Bag</span>
                  <Button
                    className="add"
                    onClick={() => {
                      navigate("/products");
                      setshowCart(false);
                    }}
                  >
                    Add Now
                  </Button>
                </NoProducts>
              </>
            )}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {showPayBtn ? (
              <StripeCheckout
                name="FashX"
                image="https://yt3.ggpht.com/fSgGbPZgG8RKo6VVStHHdWQfZw--02dqEESr2y-ztWoZkiEIls0UhYigIsOZiYZDNMkb9CEu=s600-c-k-c0x00ffffff-no-rj-rp-mo"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={handleToken}
                stripeKey={KEY}
                className="pay"
              ></StripeCheckout>
            ) : (
              <Button
                onClick={() =>
                  cart.products.length !== 0 && setShowPayBtn(true)
                }
              >
                CHECKOUT NOW
              </Button>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      {loading && <LoadingSpinner />}
    </Container>
  );
};

export default Cart;
