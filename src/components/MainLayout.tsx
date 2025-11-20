import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, theme, ConfigProvider } from 'antd';
import {
    DesktopOutlined,
    FileTextOutlined,
    ExperimentOutlined,
    PlayCircleOutlined,
} from '@ant-design/icons';
import { Link, useLocation, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        key: '/',
        icon: <DesktopOutlined />,
        label: <Link to="/">Dashboard</Link>,
    },
    {
        key: '/library',
        icon: <FileTextOutlined />,
        label: <Link to="/library">Test Library</Link>,
    },
    {
        key: '/plans',
        icon: <ExperimentOutlined />,
        label: <Link to="/plans">Test Plans</Link>,
    },
    {
        key: '/runs',
        icon: <PlayCircleOutlined />,
        label: <Link to="/runs">Runs</Link>,
    },
];

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const breadcrumbItems = [
        { title: <Link to="/">Home</Link> },
        ...pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return {
                title: <Link to={url}>{pathSnippets[index].charAt(0).toUpperCase() + pathSnippets[index].slice(1)}</Link>,
            };
        }),
    ];



    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#88C0D0', // Nord8
                    colorBgBase: '#2E3440', // Nord0
                    colorBgContainer: '#3B4252', // Nord1
                    colorText: '#D8DEE9', // Nord4
                    colorTextSecondary: '#E5E9F0', // Nord5
                    borderRadius: 6,
                },
                components: {
                    Layout: {
                        bodyBg: '#2E3440',
                        headerBg: '#3B4252',
                        siderBg: '#2E3440',
                    },
                    Menu: {
                        itemBg: '#2E3440',
                        darkItemBg: '#2E3440',
                    }
                }
            }}
        >
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: '#2E3440' }}>
                    <div style={{ height: 64, margin: 16, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {!collapsed && (
                            <span style={{ color: '#D8DEE9', fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px', fontFamily: 'sans-serif' }}>
                                TestFlow
                            </span>
                        )}
                        {collapsed && (
                            <span style={{ color: '#88C0D0', fontSize: '24px', fontWeight: 'bold' }}>
                                TF
                            </span>
                        )}
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header style={{ padding: '0 24px', background: '#2E3440' }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: '#3B4252',
                                borderRadius: 8,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', background: '#2E3440', color: '#4C566A' }}>
                        New Test Master ©{new Date().getFullYear()} Created by Antigravity
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout;
