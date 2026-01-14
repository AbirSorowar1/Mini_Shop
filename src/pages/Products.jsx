// src/pages/Products.jsx

import React, { useState } from 'react';
import { Card, Row, Col, Tag, Button, message, Modal } from 'antd';
import {
    ShoppingCartOutlined,
    DollarOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { dbPush } from '../services/firebase';

const Products = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [purchasingProduct, setPurchasingProduct] = useState(null);

    const products = [
        {
            id: 1,
            name: 'Premium Laptop',
            price: 999.99,
            category: 'Electronics',
            description: 'High-performance laptop with 16GB RAM and 512GB SSD'
        },
        {
            id: 2,
            name: 'Designer Watch',
            price: 299.99,
            category: 'Fashion',
            description: 'Luxury watch with leather strap and waterproof design'
        },
        {
            id: 3,
            name: 'Smart Home Hub',
            price: 149.99,
            category: 'Home',
            description: 'Control all your smart devices from one place'
        },
        {
            id: 4,
            name: 'Fitness Tracker',
            price: 199.99,
            category: 'Sports',
            description: 'Track your workouts, heart rate, and sleep patterns'
        },
        {
            id: 5,
            name: 'Programming Books Bundle',
            price: 79.99,
            category: 'Books',
            description: 'Complete collection of modern programming guides'
        },
        {
            id: 6,
            name: 'Gaming Console',
            price: 499.99,
            category: 'Electronics',
            description: 'Next-gen gaming console with 4K graphics'
        },
        {
            id: 7,
            name: 'Wireless Headphones',
            price: 179.99,
            category: 'Electronics',
            description: 'Noise-cancelling headphones with 30-hour battery'
        },
        {
            id: 8,
            name: 'Smart Camera',
            price: 249.99,
            category: 'Electronics',
            description: '4K camera with AI-powered features'
        }
    ];

    const handleBuyNow = async (product) => {
        if (!user) {
            message.warning('Please login to purchase products');
            return;
        }

        setPurchasingProduct(product.id);
        setLoading(true);

        try {
            // Create purchase object
            const purchaseData = {
                productId: product.id,
                productName: product.name,
                price: product.price,
                category: product.category,
                description: product.description,
                purchaseDate: new Date().toISOString(),
                userId: user.uid,
                userEmail: user.email
            };

            // Save to Firebase
            await dbPush(`purchases/${user.uid}`, purchaseData);

            // Success message
            Modal.success({
                title: 'Purchase Successful!',
                content: (
                    <div className="space-y-2">
                        <p>You have successfully purchased <strong>{product.name}</strong></p>
                        <p className="text-gray-600">Amount: ${product.price}</p>
                        <p className="text-sm text-gray-500">
                            Check your profile to see all purchases
                        </p>
                    </div>
                ),
                okText: 'View Profile',
                onOk: () => {
                    window.location.hash = '#profile';
                }
            });

        } catch (error) {
            message.error('Purchase failed. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
            setPurchasingProduct(null);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <p className="text-gray-600 mt-2">
                    Browse and purchase amazing products
                </p>
            </div>

            <Row gutter={[16, 16]}>
                {products.map(product => (
                    <Col xs={24} sm={12} lg={8} key={product.id}>
                        <Card
                            cover={
                                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative">
                                    <ShoppingCartOutlined className="text-6xl text-white" />
                                    <div className="absolute top-2 right-2">
                                        <Tag color="red" className="text-base px-3 py-1">
                                            ${product.price}
                                        </Tag>
                                    </div>
                                </div>
                            }
                            actions={[
                                <Button
                                    key="buy"
                                    type="primary"
                                    icon={<ShoppingCartOutlined />}
                                    loading={loading && purchasingProduct === product.id}
                                    onClick={() => handleBuyNow(product)}
                                    block
                                    size="large"
                                    className="mx-2"
                                >
                                    Buy Now
                                </Button>
                            ]}
                        >
                            <Card.Meta
                                title={
                                    <div className="text-lg font-bold">{product.name}</div>
                                }
                                description={
                                    <div className="space-y-2">
                                        <p className="text-gray-600 text-sm">{product.description}</p>
                                    </div>
                                }
                            />
                            <div className="mt-4 flex items-center justify-between">
                                <Tag color="blue">{product.category}</Tag>
                                <div className="flex items-center gap-1 text-green-600 font-bold text-xl">
                                    <DollarOutlined />
                                    {product.price}
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {!user && (
                <Card className="bg-yellow-50 border-yellow-200">
                    <div className="text-center">
                        <CheckCircleOutlined className="text-4xl text-yellow-500 mb-2" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Login to Purchase
                        </h3>
                        <p className="text-gray-600">
                            Please login with Google to start purchasing products
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Products;