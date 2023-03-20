import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ROUTHING_PATHS } from "./common/constants/routing.constants";
import USER_ROLES from "./common/constants/user-roles.constant";
import Unauthorized from "./components/error/Unautorized";
import RequireAuth from "./components/guards/RequireAuth";
import Layout from "./components/layouts/Layout";
import { firebaseAuth } from "./firebase-auth";
import { currentUser } from "./functions/auth";
import Dashboard from "./pages/admin/Dashboard";
import AdminView from "./pages/admin/AdminView";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import UserView from "./pages/user/UserView";
import Wishlist from "./pages/user/Wishlist";
import { loggedInUser } from "./reducers/user-reducer";
import Categories from "./pages/admin/categories/Categories";
import CategoryUpdate from "./pages/admin/categories/CategoryUpdate";

const {
    root,
    login,
    register,
    registerComplete,
    forgotPassword,
    user,
    history,
    password,
    wishlist,
    admin,
    dashboard,
    unauthorized,
    product,
    products,
    category,
    subCategory,
    coupons
} = ROUTHING_PATHS;

const App = () => {
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
                    })
                    .catch(error => console.log(`CurrentUser error => `, error));
            }
        });

        return unsubscribe();
    }, [dispatch]);

    return (
        <Routes>
            <Route path={root} element={<Layout />}>

                {/* Public routes */}
                <Route path={login} element={<Login />} />
                <Route path={register} element={<Register />} />
                <Route path={registerComplete} element={<RegisterComplete />} />
                <Route path={forgotPassword} element={<ForgotPassword />} />
                <Route path={unauthorized} element={<Unauthorized />} />

                {/* UserRoutes */}
                <Route path={`${root}/${user}`} element={<UserView />} >
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.subscriber]} />} >
                        <Route path={history} element={<History />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.subscriber]} />} >
                        <Route path={password} element={<Password />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.subscriber]} />} >
                        <Route path={wishlist} element={<Wishlist />} />
                    </Route>
                </Route>

                {/* AdminRoutes */}
                <Route path={`${root}/${admin}`} element={<AdminView />} >
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.admin]} />} >
                        <Route path={dashboard} element={<Dashboard />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.admin]} />} >
                        <Route path={product} element={<h1>Product</h1>} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.admin]} />} >
                        <Route path={products} element={<h1>Products</h1>} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.admin]} />} >
                        <Route path={category} element={<Categories />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.admin]} />} >
                        <Route path={`${category}/:slug`} element={<CategoryUpdate />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.admin]} />} >
                        <Route path={subCategory} element={<h1>Sub Category</h1>} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.admin]} />} >
                        <Route path={coupons} element={<h1>Coupons</h1>} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[USER_ROLES.admin]} />} >
                        <Route path={password} element={<Password />} />
                    </Route>
                </Route>


                {/* Catch all  TODO */}
                <Route path="*" element={<h1>Missing</h1>} />

            </Route>
        </Routes >
    );
};

export default App;