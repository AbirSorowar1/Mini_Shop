// src/components/layout/AppLayout.jsx

import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../../pages/Dashboard';
import Profile from '../../pages/Profile';
import Users from '../../pages/Users';
import Products from '../../pages/Products';
import Calendar from '../../pages/Calendar';
import Settings from '../../pages/Settings';

const { Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard />;
            case 'profile':
                return <Profile />;
            case 'users':
                return <Users />;
            case 'products':
                return <Products />;
            case 'calendar':
                return <Calendar />;
            case 'settings':
                return <Settings />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <Layout className="min-h-screen">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <Layout>
                <Header
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <Content className="m-6">
                    {renderPage()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;