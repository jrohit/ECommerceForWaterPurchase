import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="text-gray-600 body-font bg-gray-100 m-5 mt-0">
        <div className="container bg-gray-100 px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col"></div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              <a href="/"> © 2023 Water Purchase App — </a>
              <a
                href="https://github.com/jrohit"
                rel="noopener noreferrer"
                className="text-gray-600 ml-1"
                target="_blank"
              >
                @jrohit
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
