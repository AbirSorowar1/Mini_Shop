// src/components/layout/Header.jsx

import React from 'react';
import { Layout, Space, Badge, Avatar, Dropdown, Breadcrumb } from 'antd';
import {
    BellOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const { Header: AntHeader } = Layout;

const Header = ({ currentPage, setCurrentPage }) => {
    const { user, signOut } = useAuth();

    const userMenu = {
        items: [
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: 'My Profile'
            },
            {
                key: 'settings',
                icon: <SettingOutlined />,
                label: 'Settings'
            },
            { type: 'divider' },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout',
                danger: true
            }
        ],
        onClick: ({ key }) => {
            if (key === 'logout') {
                signOut();
            } else if (key === 'settings') {
                setCurrentPage('settings');
            } else if (key === 'profile') {
                setCurrentPage('profile');
            }
        }
    };

    return (
        <AntHeader className="bg-white shadow-sm px-6 flex items-center justify-between">
            <Breadcrumb
                items={[
                    { title: <HomeOutlined /> },
                    { title: currentPage.charAt(0).toUpperCase() + currentPage.slice(1) }
                ]}
            />

            <Space size="large">
                <Badge count={5}>
                    <BellOutlined className="text-xl cursor-pointer" />
                </Badge>

                <Dropdown menu={userMenu} placement="bottomRight">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar src={user?.photoURL} icon={<UserOutlined />} />
                        <span className="font-semibold">{user?.displayName}</span>
                    </div>
                </Dropdown>
            </Space>
        </AntHeader>
    );
};

export default Header;