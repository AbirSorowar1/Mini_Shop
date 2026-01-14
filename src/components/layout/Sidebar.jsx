// src/components/layout/Sidebar.jsx

import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    TeamOutlined,
    ShoppingCartOutlined,
    CalendarOutlined,
    SettingOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed, currentPage, setCurrentPage }) => {
    const menuItems = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: 'profile', icon: <UserOutlined />, label: 'My Profile' },
        { key: 'users', icon: <TeamOutlined />, label: 'Users' },
        { key: 'products', icon: <ShoppingCartOutlined />, label: 'Products' },
        { key: 'calendar', icon: <CalendarOutlined />, label: 'Calendar' },
        { key: 'settings', icon: <SettingOutlined />, label: 'Settings' }
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            className="shadow-lg"
            breakpoint="lg"
        >
            <div className="h-16 flex items-center justify-center text-white text-xl font-bold">
                {collapsed ? '🚀' : ''}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[currentPage]}
                items={menuItems}
                onClick={({ key }) => setCurrentPage(key)}
            />
        </Sider>
    );
};

export default Sidebar;