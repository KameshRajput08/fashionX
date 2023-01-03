import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import { publicRequest } from "../axiosRequest";

const Container = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category ? `/products?category=${category}` : "/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product key={item._id} item={item} />
      ))}
    </Container>
  );
};

export default Products;
