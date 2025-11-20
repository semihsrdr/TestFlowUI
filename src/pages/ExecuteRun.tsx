import React, { useEffect } from 'react';
import { Card, Progress, Badge, List, Typography, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useRunStore } from '../store/runStore';

const { Text } = Typography;

const ExecuteRun: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // This is runId or planId depending on context. Let's assume runId for viewing, or planId for starting?
    // Actually, the flow is: Plan -> Click Run -> Creates Run -> Redirects to Run Detail.
    // So this page is Run Detail.

    const { runs, updateRun } = useRunStore();
    const run = runs.find((r) => r.id === id);
    const navigate = useNavigate();

    // Mock polling/execution simulation
    useEffect(() => {
        if (run && run.status === 'running') {
            const interval = setInterval(() => {
                if (run.progress < 100) {
                    const newProgress = run.progress + 10;
                    const newLogs = [...run.logs, `[${new Date().toLocaleTimeString()}] Executing step... ${newProgress}%`];

                    let newStatus = run.status;
                    if (newProgress >= 100) {
                        newStatus = Math.random() > 0.2 ? 'passed' : 'failed';
                        newLogs.push(`[${new Date().toLocaleTimeString()}] Execution finished. Status: ${newStatus.toUpperCase()}`);
                    }

                    updateRun(run.id, {
                        progress: newProgress,
                        logs: newLogs,
                        status: newStatus,
                    });
                } else {
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [run, updateRun]);

    if (!run) {
        return <div>Run not found</div>;
    }

    return (
        <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Execution: {run.planName}</h1>
                <Badge status={run.status === 'running' ? 'processing' : run.status === 'passed' ? 'success' : 'error'} text={run.status.toUpperCase()} />
            </div>

            <Card title="Progress" style={{ marginBottom: 24 }}>
                <Progress percent={run.progress} status={run.status === 'failed' ? 'exception' : run.status === 'passed' ? 'success' : 'active'} />
            </Card>

            <Card title="Live Logs" style={{ background: '#000', color: '#fff' }} bodyStyle={{ padding: 0 }}>
                <div style={{ height: 300, overflowY: 'auto', padding: 16, fontFamily: 'monospace' }}>
                    <List
                        dataSource={run.logs}
                        renderItem={(item) => (
                            <List.Item style={{ border: 'none', padding: '4px 0' }}>
                                <Text style={{ color: '#0f0' }}>{item}</Text>
                            </List.Item>
                        )}
                    />
                </div>
            </Card>

            <div style={{ marginTop: 24, textAlign: 'right' }}>
                <Button onClick={() => navigate('/runs')}>Back to Runs</Button>
            </div>
        </div>
    );
};

export default ExecuteRun;
