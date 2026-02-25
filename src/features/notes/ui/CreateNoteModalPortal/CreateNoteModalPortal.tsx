import { Form, Input, Modal } from 'antd';
import { createPortal } from 'react-dom';

interface CreateNoteModalPortalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (text: string) => Promise<void>;
}

export function CreateNoteModalPortal({ open, loading, onClose, onSubmit }: CreateNoteModalPortalProps) {
  const [form] = Form.useForm<{ text: string }>();
  const container = document.getElementById('modals-container');

  if (!container) {
    return null;
  }

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values.text);
      form.resetFields();
    } catch (error) {
      if (error && typeof error === 'object' && 'errorFields' in error) {
        return;
      }
    }
  };

  return createPortal(
    <Modal
      title="Создать запись"
      open={open}
      okText="Отправить"
      cancelText="Отмена"
      onCancel={handleClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Текст"
          name="text"
          rules={[
            { required: true, message: 'Введите текст' },
            { min: 1, max: 255, message: 'От 1 до 255 символов' }
          ]}
        >
          <Input placeholder="Введите текст записи" maxLength={255} />
        </Form.Item>
      </Form>
    </Modal>,
    container
  );
}
