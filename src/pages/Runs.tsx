import React from 'react';
import { Table, Tag, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRunStore, type Run } from '../store/runStore';

const Runs: React.FC = () => {
    const { runs } = useRunStore();
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Run ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Plan Name',
            dataIndex: 'planName',
            key: 'planName',
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
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress: number) => `${progress}%`,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Run) => (
                <Button icon={<EyeOutlined />} onClick={() => navigate(`/runs/${record.id}`)}>
                    View
                </Button>
            ),
        },
    ];

    return (
        <div>
            <h2>Execution History</h2>
            <Table dataSource={runs} columns={columns} rowKey="id" />
        </div>
    );
};

export default Runs;
