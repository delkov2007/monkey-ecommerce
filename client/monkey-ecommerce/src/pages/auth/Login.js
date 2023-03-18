import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTHING_PATHS } from "../../common/constants/routing.constants";
import { firebaseAuth } from "../../firebase-auth";
import { createOrUpdateUser, redirectBaseOnRole } from "../../functions/auth";
import { loggedInUser } from "../../reducers/user-reducer";

const { forgotPassword } = ROUTHING_PATHS;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginDisabled, setLoginDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);
    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    console.log(res.data);
                    const user = {
                        _id: res.data._id,
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        isAuthenticated: true
                    };
                    dispatch(loggedInUser(user));
                    redirectBaseOnRole({ role: res.data.role, navigate: navigate });
                })
                .catch(error => console.log(`CreateOrUpdateUser error => `, error))
                .finally(() => {
                    setIsLoading(false);
                });
        }
        catch (error) {
            console.log(`Login Error --> `, error);
            setIsLoading(false);
            toast.error(error.message);
        }

    };

    useEffect(() => {
        if (!email || !password) {
            setLoginDisabled(true);
            return;
        };
        if (password.length < 6) {
            setLoginDisabled(true);
            return;
        };
        setLoginDisabled(false);
    }, [email, password]);

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control mt-1"
                                value={email}
                                onChange={onEmailChange}
                                placeholder="Your email"
                                autoFocus
                            />

                            <input
                                type="password"
                                className="form-control mt-1"
                                value={password}
                                onChange={onPasswordChange}
                                placeholder="Password"
                            />

                            <Button
                                type="primary"
                                className="mt-3 w-100"
                                size="large"
                                onClick={onLoginSubmit}
                                disabled={isLoginDisabled}
                                loading={isLoading}
                            >
                                Login with email/password
                            </Button>
                        </div>
                    </form>

                    <div className="float-end mt-1">
                        <Link to={`/${forgotPassword}`} className="text-danger">Forgot password</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 