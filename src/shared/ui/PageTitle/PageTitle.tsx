import { Typography } from 'antd';
import './PageTitle.css';

type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="page-title">
      <Typography.Title level={2} className="page-title__title">
        {title}
      </Typography.Title>
      {subtitle ? (
        <Typography.Text className="page-title__subtitle">{subtitle}</Typography.Text>
      ) : null}
    </div>
  );
}
