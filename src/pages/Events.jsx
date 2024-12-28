import React from "react";
import { Outlet } from "react-router-dom";

const Events = () => {
  return (
    <div>
      <h2>Events</h2>
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
};

export default Events;
