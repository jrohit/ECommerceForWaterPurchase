// NotFound.js
import React from "react";
import Header from "../header/header";

const NotFound = () => {
  return (
    <>
      <Header displayLogin={true} />

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-lg">
          Sorry, the page you're looking for does not exist.
        </p>
      </div>
    </>
  );
};

export default NotFound;
