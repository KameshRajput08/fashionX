import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Product from "../components/Product";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.Wishlist);

  return (
    <>
      <Container>
        <Wrapper>
          <h1>My Wishlist ({wishlist.products?.length})</h1>
          <ProductList>
            {wishlist.products.map((item) => {
              return <Product key={item._id} item={item} sm="true" />;
            })}
          </ProductList>
        </Wrapper>
      </Container>
    </>
  );
};

export default Wishlist;

const Container = styled.div`
  background-color: #f4f4f4;
  padding-top: 70px;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  padding: 30px 20px;

  h1 {
    margin-bottom: 20px;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
