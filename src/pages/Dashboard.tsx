import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag } from 'antd';
import { FileTextOutlined, ExperimentOutlined, PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
    // Dummy data for Activity List
    const dataSource = [
        {
            key: '1',
            runId: 'RUN-1001',
            plan: 'Regression Suite',
            status: 'passed',
            time: '2 mins ago',
        },
        {
            key: '2',
            runId: 'RUN-1002',
            plan: 'Smoke Test',
            status: 'failed',
            time: '15 mins ago',
        },
        {
            key: '3',
            runId: 'RUN-1003',
            plan: 'New Feature X',
            status: 'running',
            time: 'Now',
        },
    ];

    const columns = [
        {
            title: 'Run ID',
            dataIndex: 'runId',
            key: 'runId',
        },
        {
            title: 'Test Plan',
            dataIndex: 'plan',
            key: 'plan',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'default';
                if (status === 'passed') color = 'green';
                if (status === 'failed') color = 'red';
                if (status === 'running') color = 'blue';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
    ];

    return (
        <div>
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Tests"
                            value={120}
                            prefix={<FileTextOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Active Plans"
                            value={5}
                            prefix={<ExperimentOutlined />}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Runs"
                            value={42}
                            prefix={<PlayCircleOutlined />}
                            valueStyle={{ color: '#1677ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Pass Rate"
                            value={93}
                            suffix="%"
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
            </Row>

            <div style={{ marginTop: 24 }}>
                <h3>Recent Activity</h3>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
        </div>
    );
};

export default Dashboard;
