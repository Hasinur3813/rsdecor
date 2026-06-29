import axiosInstance from "./axiosInstance";

const authClient = {
  login(credentials) {
    return axiosInstance.post("/auth/login", credentials);
  },

  register({ name, email, password }) {
    return axiosInstance.post("/auth/register", { name, email, password });
  },

  logout() {
    return axiosInstance.post("/auth/logout");
  },

  getMe() {
    return axiosInstance.get("/auth/me");
  },

  refreshToken() {
    return axiosInstance.post("/auth/refresh-token");
  },
};

export default authClient;
