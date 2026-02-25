import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import type { NoteItem } from '../../../../shared/api/notesApi';

interface NotesTableProps {
  notes: NoteItem[];
  loading: boolean;
  deletingIds: number[];
  onDelete: (id: number) => Promise<void>;
  onCreateClick: () => void;
}

export function NotesTable({ notes, loading, deletingIds, onDelete, onCreateClick }: NotesTableProps) {
  const columns: ColumnsType<NoteItem> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 80
      },
      {
        title: 'Текст',
        dataIndex: 'text'
      },
      {
        title: 'Создано',
        dataIndex: 'created_at',
        width: 220,
        render: (value: string) => new Date(value).toLocaleString('ru-RU')
      },
      {
        title: '',
        key: 'actions',
        width: 80,
        render: (_value, record) => (
          <Popconfirm title="Удалить запись?" okText="Да" cancelText="Нет" onConfirm={() => onDelete(record.id)}>
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              aria-label="Удалить запись"
              loading={deletingIds.includes(record.id)}
            />
          </Popconfirm>
        )
      }
    ],
    [deletingIds, onDelete]
  );

  return (
    <Card className="app-card app-card--wide" bordered={false}>
      <Space className="app-card__header" align="center">
        <Typography.Title level={4} style={{ margin: 0 }}>
          Тестовая таблица
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreateClick}>
          Создать
        </Button>
      </Space>

      <div className="table-container">
        {loading ? (
          <div className="table-loader">
            <Spin size="large" />
          </div>
        ) : (
          <Table rowKey="id" columns={columns} dataSource={notes} pagination={false} />
        )}
      </div>
    </Card>
  );
}
