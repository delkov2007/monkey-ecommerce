import { Link } from "react-router-dom";
import { ROUTHING_PATHS } from "../../common/constants/routing.constants";

const {
    admin,
    dashboard
} = ROUTHING_PATHS;

const AdminNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to={`/${admin}/${dashboard}`} className="nav-link">Admin Dashboard</Link>
                </li>
            </ul>
        </nav >
    );
};

export default AdminNav;