import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { firebaseAuth } from '../../firebase-auth';
import { LOCAL_STORAGE_KEYS } from "../../common/constants/localstorage.constants";
import { ROUTHING_PATHS } from "../../common/constants/routing.constants";


const RegisterComplete = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail(localStorage.getItem(LOCAL_STORAGE_KEYS.emailForRegistration));
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

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