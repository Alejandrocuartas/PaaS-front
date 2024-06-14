import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValidator } from "../hooks/auth_validator";
import { useGlobalState } from "../context";
import Loading from "../components/Loading";
import { getAppsRequest } from "../requests/get_apps";
import AppComponent from "../components/AppComponent";

const Home = () => {
    const globalState = useGlobalState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [appsResponse, setAppsResponse] = useState({ data: [] })

    const fetchApps = () => {
        if (globalState?.id) {
            setLoading(true)
            getAppsRequest(globalState?.id).then((response) => {
                setAppsResponse(response)
                setLoading(false)
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        setInterval(() => {
            fetchApps()
        }, 60000)
    }, [globalState?.refetch])

    useEffect(() => {
        const userData = useAuthValidator();
        !userData ? navigate("/login") : globalState?.setUser({ ...userData })
    }, [])

    useEffect(() => {
        fetchApps()
    }, [globalState?.id, globalState?.refetch])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading width={12} height={12} />
            </div>
        )
    }

    if (appsResponse?.data?.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-white">You have no apps</h1>
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                appsResponse?.data?.length ? (
                    appsResponse?.data?.map((app: any) => (
                        <AppComponent app={app} />
                    ))
                ) : null
            }
        </div>
    );
};

export default Home;