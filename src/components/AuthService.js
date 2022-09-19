import axios from "axios";

const API_URL = "/auth";



const login = (username, password) => {
    console.log(username);
    console.log(password);

  return axios
    .post("http://localhost:8080/authenticate", {
      username,
      password,
    },{ headers: {
    "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
} })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  
  login,
  logout,
  getCurrentUser,
};

export default authService;