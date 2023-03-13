import React, { useState } from 'react';
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    UserOutlined,
    UserAddOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTHING_PATHS } from '../../common/constants/routing.constants';

const { SubMenu } = Menu;
const { root, login, register } = ROUTHING_PATHS;

const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        setCurrent(e.key);
    };
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" className="nav-container">
            <Menu.Item key="home" icon={<AppstoreOutlined />}>
                <Link to={root}>Home</Link>
            </Menu.Item>
            <SubMenu key="username" icon={<SettingOutlined />} title="Username">
                <Menu.Item key="option:1">
                    Option 1
                </Menu.Item>
                <Menu.Item key="option:2">
                    Option 2
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="register" icon={<UserAddOutlined />}>
                <Link to={register}>Register</Link>
            </Menu.Item>
            <Menu.Item key="login" icon={<UserOutlined />}>
                <Link to={login}>Login</Link>
            </Menu.Item>
        </Menu>
    );
};

export default Header;