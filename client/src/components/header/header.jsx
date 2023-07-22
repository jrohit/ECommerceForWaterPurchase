import React, { useState } from "react";
import { TfiShoppingCart, TfiShoppingCartFull } from "react-icons/tfi";
import { FaBottleWater } from "react-icons/fa6";
import { GrLogin } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/Modal";
import Cart from "../cart/Cart";
import { logout } from "../login/loginSlice";

const Header = ({ displayLogin }) => {
  const { cart } = useSelector((state) => state.order);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-4 flex flex-wrap p-5 flex-col md:flex-row items-center ">
          <div className="hover:bg-gray-100">
            <a
              href="/"
              className="flex title-font font-medium cursor-pointer items-center text-gray-900 mb-4 md:mb-0"
            >
              <FaBottleWater size={50} />
              Water Purchase App
            </a>
          </div>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>
          <button
            onClick={openModal}
            className="inline-flex items-center border-0 py-1 focus:outline-none hover:bg-gray-100 rounded text-base mt-4 md:mt-0"
          >
            {cart && cart.length > 0 ? (
              <TfiShoppingCartFull size={35} />
            ) : (
              <TfiShoppingCart size={35} />
            )}
          </button>

          <button className="inline-flex items-center border-0 py-1 focus:outline-none hover:bg-gray-100 rounded text-base mt-4 ml-3 md:mt-0">
            {displayLogin ? (
              <>
                Login{" "}
                <a href="/login">
                  <GrLogin size={20} />
                </a>
              </>
            ) : (
              <>
                Logout
                <a
                  href="/"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <GrLogin size={20} />
                </a>
              </>
            )}
          </button>
        </div>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <Cart />
        </Modal>
      </header>
    </>
  );
};

export default Header;
