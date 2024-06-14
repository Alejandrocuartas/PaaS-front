import axios from "axios";
import errorManagement from "./error_management";

export const createAppRequest = async (name: string, repositoryUrl: string, deploymentDir: string, userId: number) => {
    try {
        const response = await axios.post(`${process.env.API}/apps`, {
            name,
            repository_url: repositoryUrl,
            deployment_directory: deploymentDir,
            user_id: userId,
        });
        return response.data?.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
