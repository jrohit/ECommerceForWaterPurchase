import React from "react";
import Water from "../water/Water";
import { Toaster } from "react-hot-toast";
import Header from "../header/header";

const Dashboard = () => {
  return (
    <>
      <Header displayLogin={true} />
      <Water />
      <Toaster position="top-right" toastOptions={{ duration: 1000 }} />
    </>
  );
};

export default Dashboard;
