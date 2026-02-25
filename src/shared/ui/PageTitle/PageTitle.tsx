import { Typography } from 'antd';

type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div>
      <Typography.Title level={2} style={{ margin: 0, color: '#fff' }}>
        {title}
      </Typography.Title>
      {subtitle ? (
        <Typography.Text style={{ color: '#d6e6ff' }}>{subtitle}</Typography.Text>
      ) : null}
    </div>
  );
}
