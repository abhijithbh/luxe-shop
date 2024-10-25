import { loginFailure, loginStart, loginSuccess, logout as logoutAction } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
    throw err;
  }
};

export const logout = (dispatch) => {
  dispatch(logoutAction());
};

export const register = async (user) => {
  try {
    const res = await publicRequest.post("/auth/register", user);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Registration error:", err.response?.data || err.message);
    throw err;
  }
};
