import { Link } from "react-router-dom";
import { ROUTHING_PATHS } from "../../common/constants/routing.constants";

const {
    admin,
    dashboard,
    product,
    products,
    category,
    subCategory,
    coupons,
    password
} = ROUTHING_PATHS;

const AdminNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to={`/${admin}/${dashboard}`} className="nav-link">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/${admin}/${product}`} className="nav-link">
                        Product
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/${admin}/${products}`} className="nav-link">
                        Products
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/${admin}/${category}`} className="nav-link">
                        Category
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/${admin}/${subCategory}`} className="nav-link">
                        Sub Category
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/${admin}/${coupons}`} className="nav-link">
                        Coupons
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/${admin}/${password}`} className="nav-link">
                        Password
                    </Link>
                </li>
            </ul>
        </nav >
    );
};

export default AdminNav;