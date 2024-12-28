import React from "react";
import Footer from "./Footer";
import Routers from "./Router"; // Assuming this is a component managing your nested routes
import Header from "./Header";

const Layout = () => {
    return (
        <>
            <Header /><br/><br/><br/>
            <Routers />
            <Footer />
        </>
    );
};

export default Layout;
