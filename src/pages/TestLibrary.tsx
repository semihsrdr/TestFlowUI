import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTestStore, type Test } from '../store/testStore';

const TestLibrary: React.FC = () => {
    const { tests, deleteTest } = useTestStore();
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const filteredTests = tests.filter((test) =>
        test.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (test.tags || []).some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (tags: string[]) => (
                <>
                    {(tags || []).map((tag) => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Test) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => navigate(`/library/edit/${record.id}`)} />
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteTest(record.id)}>
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <Input
                    placeholder="Search tests..."
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Link to="/library/create">
                    <Button type="primary" icon={<PlusOutlined />}>
                        Create Test
                    </Button>
                </Link>
            </div>
            <Table dataSource={filteredTests} columns={columns} rowKey="id" />
        </div>
    );
};

export default TestLibrary;
