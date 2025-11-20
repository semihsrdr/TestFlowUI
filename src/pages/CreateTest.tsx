import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, Card, message } from 'antd';
import Editor from '@monaco-editor/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTestStore } from '../store/testStore';

const CreateTest: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { tests, addTest, updateTest } = useTestStore();
    const [form] = Form.useForm();
    const [code, setCode] = useState('Feature: New Test\n  Scenario: \n    Given \n    When \n    Then ');

    useEffect(() => {
        if (id) {
            const test = tests.find((t) => t.id === id);
            if (test) {
                form.setFieldsValue({
                    name: test.name,
                    tags: test.tags,
                });
                setCode(test.code);
            }
        }
    }, [id, tests, form]);

    const onFinish = (values: any) => {
        if (id) {
            updateTest(id, { ...values, code });
            message.success('Test updated successfully');
        } else {
            const newTest = {
                id: Date.now().toString(),
                ...values,
                tags: values.tags || [],
                code,
            };
            addTest(newTest);
            message.success('Test created successfully');
        }
        navigate('/library');
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>
                    <Card title="Test Details">
                        <Form.Item name="name" label="Test Name" rules={[{ required: true }]}>
                            <Input placeholder="Enter test name" />
                        </Form.Item>
                        <Form.Item name="tags" label="Tags">
                            <Select mode="tags" placeholder="Select or create tags" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {id ? 'Update Test' : 'Save Test'}
                        </Button>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card title="Gherkin Editor" bodyStyle={{ padding: 0 }}>
                        <Editor
                            height="600px"
                            defaultLanguage="gherkin"
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            options={{ minimap: { enabled: false } }}
                        />
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

export default CreateTest;
