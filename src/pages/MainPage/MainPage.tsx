import { Card, Layout } from 'antd';
import { LaunchForm } from '../../features/launch/ui/LaunchForm';

const { Content } = Layout;

export function MainPage() {
  return (
    <Layout className="app-shell">
      <Content className="app-content">
        <Card className="app-card" bordered={false} title="Введите свой запрос для бота">
          <LaunchForm />
        </Card>
      </Content>
    </Layout>
  );
}
