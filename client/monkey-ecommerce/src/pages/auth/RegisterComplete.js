import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { firebaseAuth } from '../../firebase-auth';
import { LOCAL_STORAGE_KEYS } from "../../common/constants/localstorage.constants";
import { ROUTHING_PATHS } from "../../common/constants/routing.constants";
import userStore from "../../store/user.store";


const RegisterComplete = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail(localStorage.getItem(LOCAL_STORAGE_KEYS.emailForRegistration));
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Email or password is required');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            const result = await firebaseAuth.signInWithEmailLink(email, window.location.href);
            if (result.user.emailVerified) {
                //remove user email from local storage
                localStorage.removeItem(LOCAL_STORAGE_KEYS.emailForRegistration);

                //get user jwt 
                const user = firebaseAuth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();

                //some kind of store
                userStore.setUser({
                    email: 'delkov@live.com', //TODO replace with real
                    token: 'token...'
                });

                //redirect the user
                redirect(ROUTHING_PATHS.root);
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <form onSubmit={onSubmit}>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            disabled />
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={onChangePassword}
                            placeholder="Password"
                            autoFocus />
                        <button
                            type="submit"
                            className="btn btn-raised">
                            Complete Registration
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;