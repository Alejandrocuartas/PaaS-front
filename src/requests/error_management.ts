const errorManagement = (error: any) => {
    if (error?.response?.data?.error) {
        throw new Error(error.response.data.error);
    }

    throw new Error(error?.message);
}

export default errorManagement;
