import { Button } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { firebaseAuth } from "../../firebase-auth";

const Password = () => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [changePasswordDisabled, setChangePasswordDisabled] = useState(true);

    useEffect(() => {
        if (!password) {
            setChangePasswordDisabled(true);
            return;
        };
        if (password.length < 6) {
            setChangePasswordDisabled(true);
            return;
        };
        setChangePasswordDisabled(false);
    }, [password]);

    const onPasswordChange = (e) => setPassword(e.target.value);
    const onChangePasswordSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        //console.log(password);
        await firebaseAuth.currentUser.updatePassword(password)
            .then(() => {
                toast.success('Password changed successfully');
            })
            .catch(error => {
                console.log(`Change Password error => `, error);
                toast.error(error);
            })
            .finally(() => {
                setPassword('');
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4>Password Change</h4>
                        <form >
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={onPasswordChange}
                                    placeholder="New Password"
                                />
                                <Button
                                    type="primary"
                                    className="mt-3 w-100"
                                    size="large"
                                    onClick={onChangePasswordSubmit}
                                    disabled={changePasswordDisabled}
                                    loading={isLoading}
                                >
                                    Change password
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Password;