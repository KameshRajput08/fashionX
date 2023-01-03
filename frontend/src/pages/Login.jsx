import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginUser } from "../redux/userRedux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/Spinner";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url("https://images.unsplash.com/photo-1514932932932-1c7500bf245d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80");
  background-size: contain;
  background-position: 300% 50%;
  display: flex;
  align-items: flex-start;

  @media (max-width: 768px) {
    background-repeat: no-repeat;
    background-position: 28% center;
    background-size: cover;
  }

  .Link {
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    color: #654321;
  }
`;

const Wrapper = styled.div`
  width: 30%;
  height: 100%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  color: #54381d;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: none;
  outline: 1px solid #54381d;

  &:focus {
    outline: 2px solid #54381d;
  }
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 12px 20px;
  background-color: #54381d;
  color: white;
  cursor: pointer;
  margin: 10px 0px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await dispatch(loginUser({ userDetails }));
      res.type === "user/login/fulfilled"
        ? toast.success("Successfully Logged In")
        : toast.error("Invalid Credentials");
    } catch (err) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={userDetails.email}
            onChange={onChange}
          />
          <Input
            placeholder="password"
            name="password"
            type="password"
            value={userDetails.password}
            onChange={onChange}
          />
          <Button type="submit">LOGIN</Button>
          <span className="Link">DO NOT YOU REMEMBER THE PASSWORD?</span>
          <Link to="/register" className="Link">
            CREATE A NEW ACCOUNT
          </Link>
          {loading && <LoadingSpinner />}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
