import React from "react";
import { Outlet } from "react-router-dom";

const Volunteering = () => {
  return (
    <div>
      <h2>Volunteering</h2>
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
};

export default Volunteering;