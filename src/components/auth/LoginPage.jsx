// src/components/auth/LoginPage.jsx

import React from 'react';
import { Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const { signInWithGoogle, loading } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <Card className="w-full max-w-md shadow-2xl">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">🚀</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to continue to your dashboard</p>
                </div>

                <Button
                    type="primary"
                    size="large"
                    block
                    loading={loading}
                    onClick={signInWithGoogle}
                    icon={<UserOutlined />}
                    className="h-12 text-lg"
                >
                    Sign in with Google
                </Button>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>By signing in, you agree to our Terms of Service</p>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;