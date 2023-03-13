import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/nav/Header";

import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    return (
        <>
            <Header />
            <Outlet />
            <ToastContainer />
        </>
    );
};

export default Home;