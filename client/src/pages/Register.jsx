import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(https://i.ibb.co/yqcNYNR/pexels-photo-6984661.png) center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      const response = await register({
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      });
      console.log(response);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="first name"
            name="firstname"
            onChange={handleChange}
          />
          <Input
            placeholder="last name"
            name="lastname"
            onChange={handleChange}
          />
          <Input
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <Input placeholder="email" name="email" onChange={handleChange} />
          <Input
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
          <Input
            placeholder="confirm password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            required
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
