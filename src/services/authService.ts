import axios from "axios";
import type {
  SingUpdate,
  SingInData,
  User,
  updateuserData,
} from "../lib/Types";

export const apiSignUp = async (data: SingUpdate) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      data,
    );
    console.log(data);
    return response.data;
  } catch (error: any) {
    console.error("Error during sign up:", error.response?.data);
    throw error;
  }
};

export const apiSignIn = async (data: SingInData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      data,
    );
    return response.data;
  } catch (error: any) {
    console.error("Error during sign in:", error.response?.data);
    throw error;
  }
};
