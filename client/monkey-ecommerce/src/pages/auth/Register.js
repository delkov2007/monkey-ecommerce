import { Button } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { LOCAL_STORAGE_KEYS } from "../../common/constants/localstorage.constants";
import { firebaseAuth } from '../../firebase-auth';


const Register = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        // debugger;
        e.preventDefault();
        setIsLoading(true);

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        };

        // debugger;
        await firebaseAuth.sendSignInLinkToEmail(email, config)
            .finally(() => {
                setIsLoading(false);
            })
            .then(_ => {
                toast.success(`Email is send to ${email}. CLick the link to complete your registration.`);

                //save user email to local storage
                localStorage.setItem(LOCAL_STORAGE_KEYS.emailForRegistration, email);

                //clear email
                setEmail('');
            })
            .catch(err => {
                toast.error(`Ops. Something went wrong!`);
            });
    };

    const onChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control mt-1"
                                value={email}
                                onChange={onChange}
                                placeholder="Your email"
                                autoFocus
                            />
                            <Button
                                type="primary"
                                className="mt-3 w-100"
                                size="large"
                                loading={isLoading}
                                onClick={onSubmit}
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;