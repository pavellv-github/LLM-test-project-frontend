import { Typography } from 'antd';
import './RequestList.css';

const requests = [
  { label: 'GET /posts/1', description: 'Получает шаблонное сообщение запуска через Axios' },
  { label: 'POST /posts', description: 'Отправляет тему формы как тестовый POST' }
];

export function RequestList() {
  return (
    <div className="request-list">
      <Typography.Text strong>Тестовые запросы:</Typography.Text>
      <ul>
        {requests.map((request) => (
          <li key={request.label}>
            <Typography.Text>
              {request.label} — {request.description}
            </Typography.Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
