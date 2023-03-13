import { createBrowserRouter } from "react-router-dom";
import { ROUTHING_PATHS } from "./common/constants/routing.constants";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Root";

export const router = createBrowserRouter([
    {
        path: ROUTHING_PATHS.root,
        element: <Home />,
        children: [
            {
                path: ROUTHING_PATHS.login,
                element: <Login />
            },
            {
                path: ROUTHING_PATHS.register,
                element: <Register />
            },
            {
                path: ROUTHING_PATHS.registerComplete,
                element: <RegisterComplete />
            }
        ]
    },
]);