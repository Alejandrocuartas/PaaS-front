import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context";
import { useAuthValidator } from "../hooks/auth_validator";
import Login from "../components/Login";
const AuthPage = () => {
    const globalState = useGlobalState()
    const navigate = useNavigate()


    useEffect(() => {
        const userData = useAuthValidator();
        userData ? navigate("/") : globalState?.setUser(null)
    }, [])

    return (
        <Login></Login>
    );
};

export default AuthPage;
