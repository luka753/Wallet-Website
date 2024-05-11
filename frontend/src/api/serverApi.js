import axios from 'axios';

export const BASE_PATH = "http://localhost:3001"


export const API = axios.create({
    baseURL: BASE_PATH,
    headers: {
        "Content-Type": "application/json" 
    },
    credentials: "include",
});

export const signUp = async (email, password, username) => {
    try {
      const response = await API.post("/users/user", {
        "email": email,
        "password": password,
        "username": username,
      });
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };
  
export const login = async (email, password) => {
    try {
      const response = await API.post("/auth/login", {
        "email": email,
        "password": password,
      });
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };
  