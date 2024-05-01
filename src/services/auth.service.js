import api from "./api";
import TokenService from "./token.service";

// import axios from "axios";

// const API_URL = "/auth";

const signup = (username, password) => {
  return api
    .post("/register", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const login = (username, password) => {
  return api
    .post("/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  // localStorage.removeItem("user");
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;