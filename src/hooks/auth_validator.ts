export const useAuthValidator = () => {
    const user = localStorage.getItem("paas_app");

    if (!user) {
        return null;
    }


    const userData = JSON.parse(user);
    if (userData && userData.id) {
        return userData;
    }

    return null;
}