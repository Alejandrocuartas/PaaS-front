import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";
import CreateAppForm from "./CreateAppForm";

const Navbar = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const globalState = useGlobalState()

    const onCloseModal = () => {
        setModalOpen(false)
    }

    const logOut = () => {
        localStorage.removeItem("paas_app");
        window.location.href = "/login";
    }

    useEffect(() => {
    }, [])

    if (!globalState?.name) {
        return null
    }

    return (
        <>
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <Dropdown createApp={() => setModalOpen(true)} userName={globalState?.name ?? ""} logOut={logOut} />
            </nav>
            <Modal isOpen={modalOpen} onClose={onCloseModal}>
                <CreateAppForm onClose={onCloseModal}></CreateAppForm>
            </Modal>
        </>
    )
}

export default Navbar
