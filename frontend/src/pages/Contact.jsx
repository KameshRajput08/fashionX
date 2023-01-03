import {
  MapOutlined,
  MailOutlined,
  PhoneOutlined,
  AccessTime,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Container = styled.div`
  padding: 80px;

  @media (max-width: 768px) {
    padding: 14px;
  }
`;

const Header = styled.div`
  background-image: url("img/banner.png");
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

const Section = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Details = styled.div`
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
  }

  span {
    font-size: 13px;
  }

  h2 {
    font-size: 28px;
    line-height: 35px;
    padding: 20px 0;
  }

  h3 {
    font-size: 20px;
    padding-bottom: 15px;
  }

  li {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 15px 0;
    gap: 8px;

    i {
      font-size: 16px;
      padding-right: 10px;
    }

    p {
      font-size: 16px;
      margin: 0%;
    }
  }
`;

const Map = styled.div`
  width: 55%;
  height: 400px;

  @media (max-width: 768px) {
    width: 100%;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Form = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 20px;
  padding: 80px;
  border: 1px solid #e1e1e1;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }

  h6 {
    color: #ccc;
    font-size: 14px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 35px;
  }
`;

const FormDetails = styled.div`
  width: 65%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 15px 0;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 12px 15px;
  outline: none;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
`;

const Button = styled.button`
  align-self: center;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 30px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  outline: none;
  transition: 0.3s ease;
  background-color: #088178;
  color: #fff;
  margin-top: 15px;
`;

const People = styled.div`
  width: 30%;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }

  img {
    width: 65px;
    height: 65px;
    margin-right: 15px;
    object-fit: cover;
  }

  p {
    margin: 0;
    font-size: 13px;
    line-height: 25px;

    span {
      font-size: 20px;
      font-weight: 600;
      display: block;
      color: #000;
    }
  }
`;

const Item = styled.div`
  padding-bottom: 20px;
  display: flex;
  align-items: flex-start;
`;

const Contact = () => {
  return (
    <>
      <Header>
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSEGE. We love to hear from you!</p>
      </Header>
      <Container>
        <Section>
          <Details>
            <span>GET IN TOUCH</span>
            <h2>Visit one of our agency location or contact us today</h2>
            <h3>Head Office</h3>
            <div>
              <li>
                <MapOutlined />
                <p>450 Serra Mall, Stanford, CA 94305, United States</p>
              </li>
              <li>
                <MailOutlined />
                <p>Contact@example.com</p>
              </li>
              <li>
                <PhoneOutlined />
                <p>Contact@example.com</p>
              </li>
              <li>
                <AccessTime />
                <p>Monday to Sunday 9 am to 16 pm</p>
              </li>
            </div>
          </Details>
          <Map>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.407431939705!2d-122.17190768562044!3d37.42747873983917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbb2a678bea9d%3A0x29cdf01a44fc687f!2sStanford%20University!5e0!3m2!1sen!2sin!4v1651552930015!5m2!1sen!2sin"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Map>
        </Section>
        <Form>
          <FormDetails>
            <h6>LEAVE A MESSEGE</h6>
            <h3>We love to hear from you</h3>
            <InputContainer>
              <Input type="text" placeholder="Your Name" />
              <Input type="text" placeholder="Email" />
              <Input type="text" placeholder="Subject" />
              <Input rows="15" placeholder="Your Messege"></Input>
              <Button class="btn-x">Submit</Button>
            </InputContainer>
          </FormDetails>
          <People>
            <Item>
              <img src="img/p1.png" alt="" />
              <p>
                <span>John Doe</span> Senior Marketing Manager <br /> Phone: +
                91 123 456 78 90 <br /> Email: kamesh@example.com
              </p>
            </Item>
            <Item>
              <img src="img/p2.png" alt="" />
              <p>
                <span>Mark Spectar</span> Senior Marketing Manager <br /> Phone:
                + 91 739 211 83 82 <br /> Email: kamesh@example.com
              </p>
            </Item>
            <Item>
              <img src="img/p3.png" alt="" />
              <p>
                <span>Matt Murdock</span> Senior Marketing Manager <br /> Phone:
                + 91 853 834 92 12 <br /> Email: kamesh@example.com
              </p>
            </Item>
          </People>
        </Form>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Contact;
