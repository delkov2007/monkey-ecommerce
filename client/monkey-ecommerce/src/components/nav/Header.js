import {
    AppstoreOutlined, LogoutOutlined, SettingOutlined, UserAddOutlined, UserOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTHING_PATHS } from '../../common/constants/routing.constants';
import USER_ROLES from '../../common/constants/user-roles.constant';
import { firebaseAuth } from '../../firebase-auth';
import { logoutUser } from '../../reducers/user-reducer';

const { SubMenu, Item } = Menu;
const {
    root,
    login,
    register,
    admin,
    dashboard,
    user,
    history,
} = ROUTHING_PATHS;

const Header = () => {
    const currentUser = useSelector(state => ({ ...state.user }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [current, setCurrent] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(currentUser.isAuthenticated);
    }, [currentUser]);

    const onClickMenuItem = (e) => {
        setCurrent(e.key);
    };

    const onLogout = () => {
        firebaseAuth.signOut();
        dispatch(logoutUser());
        navigate(login);
    };

    return (
        <Menu onClick={onClickMenuItem} selectedKeys={[current]} mode="horizontal" className="nav-container">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to={root}>Home</Link>
            </Item>
            {
                isAuthenticated &&
                <SubMenu key="username" icon={<SettingOutlined />} title={currentUser.email}>

                    {
                        currentUser && currentUser.role === USER_ROLES.admin &&
                        <Item>
                            <Link to={`/${admin}/${dashboard}`}>Dashboard</Link>
                        </Item>
                    }

                    {
                        currentUser && currentUser.role === USER_ROLES.subscriber &&
                        <Item>
                            <Link to={`/${user}/${history}`}>Dashboard</Link>
                        </Item>
                    }

                    <Item
                        key="logout"
                        icon={<LogoutOutlined />}
                        onClick={onLogout}>
                        Logout
                    </Item>
                </SubMenu>
            }

            {
                !isAuthenticated &&
                <Item key="register" icon={<UserAddOutlined />}>
                    <Link to={register}>Register</Link>
                </Item>
            }

            {
                !isAuthenticated &&
                <Item key="login" icon={<UserOutlined />}>
                    <Link to={login}>Login</Link>
                </Item>
            }
        </Menu>
    );
};

export default Header;