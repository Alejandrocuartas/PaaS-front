import axios from "axios";
import errorManagement from "./error_management";

export const loginRequest = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${process.env.API}/login`, {
            email,
            password,
        });
        return response.data?.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
