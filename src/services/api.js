import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Before making request, do the following
instance.interceptors.request.use(
  (config) => {
    // console.log("getLocalAccessToken", TokenService.getLocalAccessToken());
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer '+token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// With response data, do the following
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // access token expired
      if (err.response.status === 401 && !originalConfig._retry) {
        // handle infinite loop
        originalConfig._retry = true;
        try {
          const accessToken = await TokenService.refreshToken();

          TokenService.updateNewAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          //return Promise.reject(_error);
          TokenService.removeUser();
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;