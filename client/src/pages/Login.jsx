import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../redux/userRedux";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(https://i.ibb.co/2cwCw9w/pexels-photo-6984650.png) center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Register = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(clearError());
    return () => dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await login(dispatch, { username, password });
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleClick}>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" disabled={isFetching}>
            {isFetching ? "LOGGING IN..." : "LOGIN"}
          </Button>
          {error && <Error>Please enter the correct credentials...</Error>}
          {/* <Link>DO YOU NOT REMEMBER YOUR PASSWORD?</Link> */}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Register>CREATE A NEW ACCOUNT</Register>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
