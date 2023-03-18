import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTHING_PATHS } from "../common/constants/routing.constants";
import UserRoutesGuard from "../components/guards/UserRoutesGuard";
import Header from "../components/nav/Header";
import { firebaseAuth } from "../firebase-auth";
import { currentUser } from "../functions/auth";
import { loggedInUser } from "../reducers/user-reducer";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import Register from "./auth/Register";
import RegisterComplete from "./auth/RegisterComplete";
import Home from "./home/Home";
import History from "./user/History";

const {
    root,
    home,
    login,
    register,
    registerComplete,
    forgotPassword,
    user,
    history
} = ROUTHING_PATHS;

const Root = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                currentUser(idTokenResult.token)
                    .then(res => {
                        debugger;
                        const user = {
                            _id: res.data._id,
                            email: res.data.email,
                            name: res.data.name,
                            role: res.data.role,
                            token: idTokenResult.token,
                            isAuthenticated: true
                        };
                        dispatch(loggedInUser(user));
                        // redirectBaseOnRole({ role: res.data.role, navigate });
                    })
                    .catch(error => console.log(`CurrentUser error => `, error));
            }
        });

        return unsubscribe();
    }, []);

    return (
        <>
            <Header />
            <ToastContainer />
            <Routes>
                <Route
                    path={root}
                    element={<Home />}
                />
                <Route
                    path={`/${login}`}
                    element={<Login />}
                />
                <Route
                    path={`/${register}`}
                    element={<Register />}
                />
                <Route
                    path={`/${registerComplete}`}
                    element={<RegisterComplete />}
                />
                <Route
                    path={`/${forgotPassword}`}
                    element={<ForgotPassword />}
                />
                <Route
                    path={`/${user}/${history}`}
                    element={
                        <UserRoutesGuard>
                            <History />
                        </UserRoutesGuard>
                    }
                />
            </Routes>
        </>
    );
};

export default Root;