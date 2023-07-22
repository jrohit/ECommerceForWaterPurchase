import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-h-[40rem] overflow-y-auto w-3/5 ">
        <button
          onClick={onClose}
          className="relative text-gray-600 hover:text-gray-800 rounded-lg focus:outline-none"
        >
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
