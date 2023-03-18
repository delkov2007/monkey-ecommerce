import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { ROUTHING_PATHS } from "./common/constants/routing.constants";
import UserRoutesGuard from "./components/guards/UserRoutesGuard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { default as Home, default as Root } from "./pages/Root";
import History from "./pages/user/History";

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

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={root} element={<Root />}>
            <Route index element={<Home />} />
            <Route path={`/${login}`} element={<Login />} />
            <Route path={`/${register}`} element={<Register />} />
            <Route path={`/${registerComplete}`} element={<RegisterComplete />} />
            <Route path={`/${forgotPassword}`} element={<ForgotPassword />} />
            <Route path={`/${user}/${history}`} element={<UserRoutesGuard><History /></UserRoutesGuard>} />
        </Route>
    )
);