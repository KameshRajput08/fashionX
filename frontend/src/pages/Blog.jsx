import { ArrowRightAlt } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";

const Header = styled.div`
  background-image: url("img/b2.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  color: #fff;
  align-items: center;
  justify-content: center;
  padding: 14px;
  margin-top: 60px;

  h2 {
    font-size: 3rem;
    margin-bottom: 10px;
  }
`;

const BlogCon = styled.div`
  padding: 80px 150px 0 150px;
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const BlogItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 50px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  h1 {
    position: absolute;
    left: 0px;
    top: -56px;
    z-index: -1;
    font-size: 70px;
    font-weight: 700;
    color: #c9cbce;
  }
`;

const ImgContainer = styled.div`
  width: 50%;
  margin-right: 40px;

  @media (max-width: 768px) {
    width: 100%;
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const Details = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }

  a {
    text-decoration: none;
    font-size: 16px;
    color: #000;
    font-weight: 600;
    position: relative;
    transition: 0.3px;

    &::after {
      content: "";
      background-color: #000;
      width: 50px;
      height: 2px;
      position: absolute;
      top: 9px;
      right: -60px;
    }

    &:hover {
      color: #088178;

      &::after {
        background-color: #088178;
      }
    }
  }

  h4 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const Pagination = styled.div`
  text-align: center;

  a {
    text-decoration: none;
    background-color: #088178;
    color: #fff;
    font-size: 20px;
    padding: 15px 20px;
    border-radius: 4px;
    font-weight: 400;
    margin-right: 4px;
  }
`;

const Blog = () => {
  return (
    <>
      <Header>
        <h2>#readmore</h2>
        <p>Read all case studies about our products</p>
      </Header>
      <BlogCon class="blog">
        <BlogItem class="blog-box">
          <ImgContainer>
            <img src="img/blog/b1.jpg" alt="" />
          </ImgContainer>
          <Details>
            <h4>The Cotton-Jersey Zip-Up Hoddies</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waistcoat
              selfies yr wolf chartreuse hexagon irony, godard...
            </p>
            <a href="#">CONTINUE READING</a>
          </Details>
          <h1>13/01</h1>
        </BlogItem>
        <BlogItem class="blog-box">
          <ImgContainer>
            <img src="img/blog/b2.jpg" alt="" />
          </ImgContainer>
          <Details>
            <h4>How to style a Quiff</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waistcoat
              selfies yr wolf chartreuse hexagon irony, godard...{" "}
            </p>
            <a href="#">CONTINUE READING</a>
          </Details>
          <h1>13/04</h1>
        </BlogItem>
        <BlogItem class="blog-box">
          <ImgContainer>
            <img src="img/blog/b3.jpg" alt="" />
          </ImgContainer>
          <Details>
            <h4>Must-Have Skater Girl Items</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waistcoat
              selfies yr wolf chartreuse hexagon irony, godard...{" "}
            </p>
            <a href="#">CONTINUE READING</a>
          </Details>
          <h1>12/01</h1>
        </BlogItem>
        <BlogItem class="blog-box">
          <ImgContainer>
            <img src="img/blog/b4.jpg" alt="" />
          </ImgContainer>
          <Details>
            <h4>Runaway-Inspired Trends</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waistcoat
              selfies yr wolf chartreuse hexagon irony, godard...{" "}
            </p>
            <a href="#">CONTINUE READING</a>
          </Details>
          <h1>16/01</h1>
        </BlogItem>
        <BlogItem class="blog-box">
          <ImgContainer>
            <img src="img/blog/b6.jpg" alt="" />
          </ImgContainer>
          <Details>
            <h4>AW20 Menswear Trends</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waistcoat
              selfies yr wolf chartreuse hexagon irony, godard...{" "}
            </p>
            <a href="#">CONTINUE READING</a>
          </Details>
          <h1>10/03</h1>
        </BlogItem>
      </BlogCon>

      <Pagination id="pagination">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">
          <ArrowRightAlt fontSize="large" className="icon" />
        </a>
      </Pagination>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Blog;
