import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 55vh;
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.2s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  position: relative;

  @media (max-width: 768px) {
    height: 55vh;
  }
`;

const ImgContainer = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  position: absolute;
  bottom: 15%;
  left: 8%;
  color: #fff;

  @media (max-width: 768px) {
    bottom: 10%;
    left: 6%;
  }
`;

const Title = styled.h1`
  font-size: 90px;
  letter-spacing: 0.8;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 500px) {
    font-size: 30px;
  }
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 6px 0px;
  }

  @media (max-width: 500px) {
    font-size: 14px;
    margin: 6px 0px;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  color: #fff;
  border: 1.8px solid #fff;
  margin-top: 6px;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px;
  }

  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
