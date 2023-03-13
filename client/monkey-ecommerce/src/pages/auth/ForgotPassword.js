import { Button } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { firebaseAuth } from "../../firebase-auth";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isResetButtonDisabled, setIsResetButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsResetButtonDisabled(!email);
    }, [email]);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onSubmitResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        };

        await firebaseAuth.sendPasswordResetEmail(email, config)
            .finally(() => {
                setIsLoading(false);
            })
            .then(() => {
                setEmail('');
                toast.success('Check your email for password reset link');
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Forgot password</h4>
                    <form>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your email"
                            value={email}
                            onChange={onEmailChange}
                        />
                        <Button
                            type="primary"
                            onClick={onSubmitResetPassword}
                            size="large"
                            className="mt-2 w-100"
                            disabled={isResetButtonDisabled}
                            loading={isLoading}
                        >
                            Reset password
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;