// src/pages/Profile.jsx

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Avatar, Statistic, List, Tag, Empty, Spin } from 'antd';
import {
    UserOutlined,
    ShoppingCartOutlined,
    DollarOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { dbRef } from '../services/firebase';
import { onValue, off } from 'firebase/database';

const Profile = () => {
    const { user } = useAuth();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalPurchases: 0,
        totalSpent: 0
    });

    useEffect(() => {
        if (!user) return;

        const purchasesRef = dbRef(`purchases/${user.uid}`);

        const unsubscribe = onValue(purchasesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const purchasesList = Object.keys(data).map(key => ({
                    key,
                    ...data[key]
                }));

                // Sort by date (newest first)
                purchasesList.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

                setPurchases(purchasesList);

                // Calculate stats
                const totalSpent = purchasesList.reduce((sum, item) => sum + item.price, 0);
                setStats({
                    totalPurchases: purchasesList.length,
                    totalSpent: totalSpent
                });
            } else {
                setPurchases([]);
                setStats({ totalPurchases: 0, totalSpent: 0 });
            }
            setLoading(false);
        });

        return () => off(purchasesRef);
    }, [user]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                <p className="text-gray-600 mt-2">View your profile and purchase history</p>
            </div>

            {/* User Info Card */}
            <Card>
                <div className="flex items-center gap-6">
                    <Avatar
                        size={100}
                        src={user?.photoURL}
                        icon={<UserOutlined />}
                        className="shadow-lg"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-800">{user?.displayName}</h2>
                        <p className="text-gray-600 mt-1">{user?.email}</p>
                        <Tag color="green" className="mt-2">Active Member</Tag>
                    </div>
                </div>
            </Card>

            {/* Statistics Cards */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                    <Card>
                        <Statistic
                            title="Total Purchases"
                            value={stats.totalPurchases}
                            prefix={<ShoppingCartOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card>
                        <Statistic
                            title="Total Spent"
                            value={stats.totalSpent.toFixed(2)}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card>
                        <Statistic
                            title="Member Since"
                            value={user?.metadata?.creationTime ?
                                new Date(user.metadata.creationTime).toLocaleDateString() :
                                'N/A'
                            }
                            prefix={<CalendarOutlined />}
                            valueStyle={{ color: '#722ed1', fontSize: '18px' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Purchase History */}
            <Card
                title={
                    <div className="flex items-center gap-2">
                        <ShoppingCartOutlined />
                        <span>Purchase History</span>
                    </div>
                }
            >
                {loading ? (
                    <div className="text-center py-12">
                        <Spin size="large" />
                        <p className="mt-4 text-gray-500">Loading purchases...</p>
                    </div>
                ) : purchases.length === 0 ? (
                    <Empty
                        description="No purchases yet"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    >
                        <p className="text-gray-500">
                            Start shopping to see your purchase history here!
                        </p>
                    </Empty>
                ) : (
                    <List
                        itemLayout="horizontal"
                        dataSource={purchases}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Tag color="green" key="price">${item.price}</Tag>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                                            <ShoppingCartOutlined className="text-2xl text-white" />
                                        </div>
                                    }
                                    title={
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{item.productName}</span>
                                            <Tag color="blue">{item.category}</Tag>
                                        </div>
                                    }
                                    description={
                                        <div className="space-y-1">
                                            <p className="text-gray-500">{item.description}</p>
                                            <p className="text-xs text-gray-400">
                                                <CalendarOutlined /> Purchased on {formatDate(item.purchaseDate)}
                                            </p>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                        pagination={{
                            pageSize: 5,
                            showTotal: (total) => `Total ${total} purchases`
                        }}
                    />
                )}
            </Card>
        </div>
    );
};

export default Profile;