// src/pages/Dashboard.jsx

import React from 'react';
import { Card, Row, Col, Statistic, Timeline, Progress, Space, Button } from 'antd';
import {
    TeamOutlined,
    ShoppingCartOutlined,
    LineChartOutlined
} from '@ant-design/icons';

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 text-center">
                    About the page
                </h1>
                <p className="text-xl  text-gray-800 text-center">Welcome to your analytics overview</p>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Users"
                            value={1128}
                            prefix={<TeamOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Revenue"
                            value={93}
                            prefix="$"
                            suffix="K"
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Orders"
                            value={456}
                            prefix={<ShoppingCartOutlined />}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Growth"
                            value={28.5}
                            suffix="%"
                            prefix={<LineChartOutlined />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Recent Activities" extra={<Button type="link">View All</Button>}>
                        <Timeline
                            items={[
                                {
                                    children: 'Created new project "React Dashboard" - 2 hours ago',
                                    color: 'green'
                                },
                                {
                                    children: 'Updated user profile settings - 5 hours ago',
                                    color: 'blue'
                                },
                                {
                                    children: 'Completed task "Database migration" - 1 day ago',
                                    color: 'gray'
                                },
                                {
                                    children: 'New team member joined - 2 days ago',
                                    color: 'green'
                                }
                            ]}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title="Quick Stats">
                        <Space direction="vertical" className="w-full" size="large">
                            <div>
                                <p className="text-gray-600 mb-2">Project Progress</p>
                                <Progress percent={75} status="active" />
                            </div>
                            <div>
                                <p className="text-gray-600 mb-2">Tasks Completed</p>
                                <Progress percent={60} strokeColor="#52c41a" />
                            </div>
                            <div>
                                <p className="text-gray-600 mb-2">Team Performance</p>
                                <Progress percent={90} strokeColor="#1890ff" />
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;