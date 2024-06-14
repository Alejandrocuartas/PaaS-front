import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context";
import { useAuthValidator } from "../hooks/auth_validator";
import Signup from "../components/Signup";
const RegisterPage = () => {
    const globalState = useGlobalState()
    const navigate = useNavigate()

    useEffect(() => {
        const userData = useAuthValidator();
        userData ? navigate("/") : globalState?.setUser(null)
    }, [])

    return (
        <Signup></Signup>
    );
};

export default RegisterPage;
