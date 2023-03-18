import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/nav/Header";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { firebaseAuth } from "../firebase-auth";
import userStore from "../stores/user.store";
import { currentUser, redirectBaseOnRole } from "../services/auth";

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                currentUser(idTokenResult.token)
                    .then(res => {
                        userStore.setUser({
                            _id: res.data._id,
                            email: res.data.email,
                            name: res.data.name,
                            role: res.data.role,
                            token: idTokenResult.token,
                            isAuthenticated: true
                        });
                        redirectBaseOnRole({ role: res.data.role, navigate });
                    })
                    .catch(error => console.log(`CurrentUser error => `, error));
            }
        });

        return unsubscribe();
    }, []);

    return (
        <>
            <Header />
            <Outlet />
            <ToastContainer />
        </>
    );
};

export default Home;