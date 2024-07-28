// components/Modal.tsx
import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-40 rounded bg-white p-4 shadow-lg flex flex-col items-center">
                <h2 className="mb-4 text-xl font-semibold">Result</h2>
                <p>{message}</p>
                <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
