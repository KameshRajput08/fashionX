import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 80px;
  margin: 40px 0;
  flex-wrap: wrap;
  background-image: url("img/newsletter_bg.png");
  background-repeat: no-repeat;
  background-position: 20% 30%;
  background-color: #0d3163;

  @media (max-width: 768px) {
    padding: 40px;
    margin: 40px 0;
    gap: 15px;
  }
  @media (max-width: 400px) {
    padding: 25px;
  }
`;

const NewsText = styled.div`
  h4 {
    font-size: 28px;
    color: #fff;
    font-weight: 800;
  }

  p {
    font-size: 15px;
    color: #818ea0;
    font-weight: 600;

    span {
      color: #ffbd27;
    }
  }
`;

const Email = styled.div`
  display: flex;
  width: 40%;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }

  input {
    height: 3.125rem;
    padding: 0 1.25rem;
    width: 100%;
    border: 1px solid transparent;
    border-radius: 4px;
    outline: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
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
  height: 3.125rem;
  white-space: nowrap;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const Newsletter = () => {
  return (
    <Container>
      <NewsText class="news-text">
        <h4>Sign Up For Newsletter</h4>
        <p>
          Get E-mail updates about our latest shops and
          <span>special offers</span>
        </p>
      </NewsText>
      <Email class="e-mail">
        <input type="text" placeholder="Your email address" />
        <Button class="btn-x">Sign Up</Button>
      </Email>
    </Container>
  );
};

export default Newsletter;
