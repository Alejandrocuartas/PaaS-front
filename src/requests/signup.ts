import axios from "axios";
import errorManagement from "./error_management";

export const signupRequest = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${process.env.API}/signup`, {
            email,
            password,
            name,
        });
        return response.data?.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
