import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

interface UserData {
  name?: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: UserData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    console.log("🔹 Sending request to:", `${API_URL}/login`);
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log("✅ Login API Response:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Login request failed:", error);
    throw error;
  }
};

