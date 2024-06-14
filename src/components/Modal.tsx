import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/Modal.css';

const Modal = (
    { isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="Modal">
            <div className="Modal__container">
                <button className="Modal__close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        //@ts-ignore
        document.getElementById("modal")
    );

};

export default Modal;
