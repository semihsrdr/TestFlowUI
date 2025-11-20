import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Transfer, message, Card, Select, Row, Col, Typography, Tag, Divider } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import { usePlanStore } from '../store/planStore';
import { SaveOutlined, FileTextOutlined, ExperimentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CreatePlan: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { tests } = useTestStore();
    const { plans, addPlan, updatePlan } = usePlanStore();
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const [form] = Form.useForm();

    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            const planToEdit = plans.find((p) => p.id === id);
            if (planToEdit) {
                form.setFieldsValue({
                    name: planToEdit.name,
                    environment: planToEdit.environment,
                });
                setTargetKeys(planToEdit.testIds);
            } else {
                message.error('Plan not found');
                navigate('/plans');
            }
        }
    }, [id, isEditMode, plans, form, navigate]);

    const onFinish = (values: any) => {
        if (isEditMode && id) {
            updatePlan(id, {
                ...values,
                testIds: targetKeys,
            });
            message.success('Test plan updated successfully');
        } else {
            const newPlan = {
                id: Date.now().toString(),
                ...values,
                testIds: targetKeys,
            };
            addPlan(newPlan);
            message.success('Test plan created successfully');
        }
        navigate('/plans');
    };

    const handleChange = (newTargetKeys: React.Key[]) => {
        setTargetKeys(newTargetKeys as string[]);
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>{isEditMode ? "Edit Test Plan" : "Create New Plan"}</Title>
                <Text type="secondary">
                    {isEditMode
                        ? "Modify your existing test plan details and test selection."
                        : "Define a new test plan by selecting an environment and adding tests."}
                </Text>
            </div>

            <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                <Row gutter={24}>
                    <Col span={8}>
                        <Card title="Plan Details" bordered={false} className="shadow-sm">
                            <Form.Item
                                name="name"
                                label="Plan Name"
                                rules={[{ required: true, message: 'Please enter a plan name' }]}
                            >
                                <Input prefix={<FileTextOutlined />} placeholder="e.g., Regression Suite v2" />
                            </Form.Item>
                            <Form.Item
                                name="environment"
                                label="Environment"
                                rules={[{ required: true, message: 'Please select an environment' }]}
                            >
                                <Select placeholder="Select Environment">
                                    <Select.Option value="Staging">Staging</Select.Option>
                                    <Select.Option value="Production">Production</Select.Option>
                                    <Select.Option value="Dev">Dev</Select.Option>
                                </Select>
                            </Form.Item>

                            <Divider />

                            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                                <Title level={4} style={{ margin: 0 }}>{targetKeys.length}</Title>
                                <Text type="secondary">Tests Selected</Text>
                            </div>

                            <Button type="primary" htmlType="submit" block icon={<SaveOutlined />} size="large">
                                {isEditMode ? "Update Plan" : "Create Plan"}
                            </Button>
                        </Card>
                    </Col>

                    <Col span={16}>
                        <Card
                            title={<Space><ExperimentOutlined /> Test Selection</Space>}
                            bordered={false}
                            className="shadow-sm"
                            bodyStyle={{ padding: 0 }}
                        >
                            <div style={{ padding: 24 }}>
                                <Transfer
                                    dataSource={tests.map((t) => ({
                                        key: t.id,
                                        title: t.name,
                                        description: t.tags?.join(', '),
                                        tags: t.tags
                                    }))}
                                    showSearch
                                    filterOption={(inputValue, item) =>
                                        item.title.indexOf(inputValue) > -1 ||
                                        (item.tags && item.tags.some(tag => tag.indexOf(inputValue) > -1))
                                    }
                                    titles={['Available Tests', 'Selected Tests']}
                                    targetKeys={targetKeys}
                                    onChange={handleChange}
                                    render={(item) => (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                            <span>{item.title}</span>
                                            <span>
                                                {item.tags?.map(tag => (
                                                    <Tag key={tag} style={{ marginRight: 4, fontSize: 10 }}>{tag}</Tag>
                                                ))}
                                            </span>
                                        </div>
                                    )}
                                    listStyle={{ width: '100%', height: 500 }}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

import { Space } from 'antd';
export default CreatePlan;
