import axios from "axios";
import errorManagement from "./error_management";

export const getAppsRequest = async (userId: number) => {
    try {
        const response = await axios.get(`${process.env.API}/apps/users/${userId}`);
        return response.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
