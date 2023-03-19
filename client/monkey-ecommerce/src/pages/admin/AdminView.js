import { Outlet } from "react-router-dom";
import AdminNav from "../../components/nav/AdminNav";

const AdminView = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminView;