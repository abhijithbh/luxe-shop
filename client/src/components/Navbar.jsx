import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAndClearCart } from "../redux/userRedux";
import { fetchCart } from "../redux/cartRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px", marginLeft: "30px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItemLoggedIn = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 12px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 12px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAndClearCart());
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCart(currentUser._id));
    }
  }, [dispatch, currentUser]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>LUXE.</Logo>
          </Link>
        </Center>
        <Right>
          {currentUser ? (
            <>
              <MenuItemLoggedIn>
                Welcome, {currentUser.username}!
              </MenuItemLoggedIn>
              <MenuItemLoggedIn onClick={handleLogout}>LOGOUT</MenuItemLoggedIn>
            </>
          ) : (
            <>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined color="action" />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
