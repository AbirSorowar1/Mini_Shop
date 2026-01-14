// src/pages/Users.jsx

import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Input, Select, Space, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { dbRef, dbSet, dbOnValue, dbRemove, dbPush } from '../services/firebase';
import { onValue, off } from 'firebase/database';

const { Option } = Select;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        status: 'Active'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const usersRef = dbRef('users');

        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const usersList = Object.keys(data).map(key => ({
                    key,
                    ...data[key]
                }));
                setUsers(usersList);
            } else {
                setUsers([]);
            }
        });

        return () => off(usersRef);
    }, []);

    const handleAdd = () => {
        setEditingUser(null);
        setFormValues({ name: '', email: '', status: 'Active' });
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingUser(record);
        setFormValues({
            name: record.name,
            email: record.email,
            status: record.status
        });
        setModalVisible(true);
    };

    const handleDelete = async (key) => {
        try {
            setLoading(true);
            await dbRemove(`users/${key}`);
            message.success('User deleted successfully');
        } catch (error) {
            message.error('Failed to delete user');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!formValues.name || !formValues.email) {
            message.error('Please fill all required fields');
            return;
        }

        try {
            setLoading(true);

            if (editingUser) {
                await dbSet(`users/${editingUser.key}`, formValues);
                message.success('User updated successfully');
            } else {
                await dbPush('users', formValues);
                message.success('User added successfully');
            }

            setModalVisible(false);
        } catch (error) {
            message.error('Operation failed');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Active' ? 'green' : 'orange'}>
                    {status}
                </Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.key)}
                        loading={loading}
                    >
                        Delete
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
                    <p className="text-gray-600 mt-2">Manage your team members (Real-time Database)</p>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    size="large"
                >
                    Add User
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    dataSource={users}
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>

            <Modal
                title={editingUser ? 'Edit User' : 'Add New User'}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleSubmit}
                okText={editingUser ? 'Update' : 'Create'}
                confirmLoading={loading}
            >
                <div className="space-y-4 py-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name *
                        </label>
                        <Input
                            value={formValues.name}
                            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                            placeholder="Enter name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                        </label>
                        <Input
                            value={formValues.email}
                            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                            placeholder="Enter email"
                            type="email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <Select
                            value={formValues.status}
                            onChange={(value) => setFormValues({ ...formValues, status: value })}
                            className="w-full"
                        >
                            <Option value="Active">Active</Option>
                            <Option value="Pending">Pending</Option>
                        </Select>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Users;