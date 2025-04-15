import { AuthResponse, LoginDto } from "@/interfaces/auth.interface";
import axios from "../config/axios";

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};

export const register = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};
