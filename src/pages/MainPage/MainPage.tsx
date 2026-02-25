import { Button, Card, Layout, Typography } from 'antd';
import { useEffect } from 'react';
import { PageTitle } from '../../shared/ui/PageTitle/PageTitle';
import { useLaunchStore } from '../../features/launch/store/useLaunchStore';

const { Header, Content } = Layout;

export function MainPage() {
  const { ready, loading, message, toggleReady, refreshMessage } = useLaunchStore();

  useEffect(() => {
    void refreshMessage();
  }, [refreshMessage]);

  return (
    <Layout className="app-shell">
      <Header className="app-header">
        <PageTitle title="LLM Test Project Frontend" subtitle="React · TypeScript · Ant Design · FSD" />
      </Header>
      <Content className="app-content">
        <Card className="app-card" bordered={false} title="Ready for Ant Design">
          <Typography.Paragraph>
            This starter follows a Feature-Sliced Design layout, so shared concerns, entities, and
            features stay isolated and can scale independently. The button below fetches data via
            Axios and persists its status state in a Zustand store.
          </Typography.Paragraph>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Button type="primary" size="large" loading={loading} onClick={() => void refreshMessage()}>
              Refresh launch payload
            </Button>
            <Button type="default" size="large" onClick={toggleReady}>
              {ready ? 'Mark as busy' : 'Mark as ready'}
            </Button>
            <Typography.Text type="secondary">
              Current message: <Typography.Text strong>{message}</Typography.Text>
            </Typography.Text>
          </div>
        </Card>
      </Content>
    </Layout>
  );
}
