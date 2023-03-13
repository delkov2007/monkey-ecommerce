import {
    AppstoreOutlined, LogoutOutlined, SettingOutlined, UserAddOutlined, UserOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTHING_PATHS } from '../../common/constants/routing.constants';
import { firebaseAuth } from '../../firebase-auth';
import userStore from '../../stores/user.store';

const { SubMenu, Item } = Menu;
const { root, login, register } = ROUTHING_PATHS;

const Header = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(userStore.initialState);
    const [current, setCurrent] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const subscription = userStore.subscribe(setUser);

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        debugger;
        console.log(user.isAuthenticated);
        setIsAuthenticated(user.isAuthenticated);
    }, [user]);

    const onClickMenuItem = (e) => {
        setCurrent(e.key);
    };

    const onLogout = () => {
        firebaseAuth.signOut();
        userStore.setUser(userStore.initialState);
        navigate(login);
    };

    return (
        <Menu onClick={onClickMenuItem} selectedKeys={[current]} mode="horizontal" className="nav-container">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to={root}>Home</Link>
            </Item>
            {
                isAuthenticated &&
                <SubMenu key="username" icon={<SettingOutlined />} title={user.email}>
                    <Item key="option:1">
                        Option 1
                    </Item>
                    <Item
                        key="option:2">
                        Option 2
                    </Item>
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