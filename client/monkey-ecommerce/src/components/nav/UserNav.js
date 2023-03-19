import { Outlet } from "react-router-dom";
import UserNav from "../../components/nav/UserNav";

const UserView = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserView;