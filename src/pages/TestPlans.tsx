import React from 'react';
import { Table, Button, Space, Popconfirm, Tag, Card, Typography, Tooltip } from 'antd';
import { PlusOutlined, PlayCircleOutlined, DeleteOutlined, EditOutlined, EnvironmentOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { usePlanStore, type TestPlan } from '../store/planStore';
import { useRunStore } from '../store/runStore';

const { Title } = Typography;

const TestPlans: React.FC = () => {
    const { plans, deletePlan } = usePlanStore();
    const { startRun } = useRunStore();
    const navigate = useNavigate();

    const handleRun = (plan: TestPlan) => {
        const runId = startRun(plan.id, plan.name);
        navigate(`/runs/${runId}`);
    };

    const columns = [
        {
            title: 'Plan Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (
                <Space>
                    <FileTextOutlined style={{ color: '#1890ff' }} />
                    <span style={{ fontWeight: 500 }}>{text}</span>
                </Space>
            ),
        },
        {
            title: 'Environment',
            dataIndex: 'environment',
            key: 'environment',
            render: (env: string) => {
                let color = 'geekblue';
                if (env === 'Production') color = 'red';
                if (env === 'Staging') color = 'orange';
                return (
                    <Tag icon={<EnvironmentOutlined />} color={color}>
                        {env}
                    </Tag>
                );
            },
        },
        {
            title: 'Tests',
            dataIndex: 'testIds',
            key: 'count',
            render: (ids: string[]) => <Tag>{ids.length} Tests</Tag>,
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'right' as const,
            render: (_: any, record: TestPlan) => (
                <Space size="small">
                    <Tooltip title="Run Plan">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<PlayCircleOutlined />}
                            onClick={() => handleRun(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Plan">
                        <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => navigate(`/plans/edit/${record.id}`)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Delete Plan"
                        description="Are you sure you want to delete this test plan?"
                        onConfirm={() => deletePlan(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete">
                            <Button danger shape="circle" icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0 }}>Test Plans</Title>
                <Link to="/plans/create">
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Create New Plan
                    </Button>
                </Link>
            </div>

            <Card bordered={false} className="shadow-sm" bodyStyle={{ padding: 0 }}>
                <Table
                    dataSource={plans}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
};

export default TestPlans;
