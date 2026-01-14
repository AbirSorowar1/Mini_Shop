// src/pages/Settings.jsx

import React, { useState } from 'react';
import { Card, Tabs, Input, Button, Switch, Space, Alert, Checkbox, message } from 'antd';

const Settings = () => {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890'
    });

    const handleSaveProfile = () => {
        message.success('Profile updated successfully!');
    };

    const tabItems = [
        {
            key: '1',
            label: 'Profile',
            children: (
                <Card>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <Input
                                value={profileData.name}
                                onChange={(e) => setProfileData({
                                    ...profileData,
                                    name: e.target.value
                                })}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <Input
                                value={profileData.email}
                                onChange={(e) => setProfileData({
                                    ...profileData,
                                    email: e.target.value
                                })}
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone
                            </label>
                            <Input
                                value={profileData.phone}
                                onChange={(e) => setProfileData({
                                    ...profileData,
                                    phone: e.target.value
                                })}
                                placeholder="Enter phone number"
                            />
                        </div>
                        <Button type="primary" onClick={handleSaveProfile}>
                            Save Changes
                        </Button>
                    </div>
                </Card>
            )
        },
        {
            key: '2',
            label: 'Notifications',
            children: (
                <Card>
                    <Space direction="vertical" className="w-full" size="large">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-semibold">Email Notifications</div>
                                <div className="text-sm text-gray-500">
                                    Receive email updates
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-semibold">Push Notifications</div>
                                <div className="text-sm text-gray-500">
                                    Receive push notifications
                                </div>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-semibold">SMS Notifications</div>
                                <div className="text-sm text-gray-500">
                                    Receive SMS alerts
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </Space>
                </Card>
            )
        },
        {
            key: '3',
            label: 'Privacy',
            children: (
                <Card>
                    <Alert
                        message="Privacy Settings"
                        description="Manage your privacy preferences and data settings here."
                        type="info"
                        showIcon
                        className="mb-4"
                    />
                    <Space direction="vertical" className="w-full" size="middle">
                        <Checkbox>Make my profile public</Checkbox>
                        <Checkbox>Allow search engines to index my profile</Checkbox>
                        <Checkbox defaultChecked>
                            Enable two-factor authentication
                        </Checkbox>
                        <Button type="primary">Update Privacy Settings</Button>
                    </Space>
                </Card>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600 mt-2">
                    Manage your account settings and preferences
                </p>
            </div>

            <Tabs items={tabItems} />
        </div>
    );
};

export default Settings;