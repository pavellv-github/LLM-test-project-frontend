import { Button, Form, Input, Typography, message as antdMessage } from 'antd';
import type { RuleObject } from 'antd/lib/form';
import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { submitLaunchNote } from '../../../../shared/api/launchApi';

const schema = yup.object({
  topic: yup.string().trim().required('Тема обязательна').min(3, 'Минимум 3 символа')
});

type FormValues = yup.InferType<typeof schema>;

const topicRule: RuleObject = {
  validator: async (_rule, value) => {
    try {
      await schema.validateAt('topic', { topic: value });
    } catch (error) {
      if (error instanceof yup.ValidationError && error.message) {
        return Promise.reject(error.message);
      }
      return Promise.reject('Неверное значение');
    }
    return Promise.resolve();
  }
};

interface LaunchFormProps {
  isRefreshing?: boolean;
  onSubmittingChange?: (isSubmitting: boolean) => void;
}

export function LaunchForm({ isRefreshing = false, onSubmittingChange }: LaunchFormProps) {
  const [form] = Form.useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResponse, setLastResponse] = useState<{ text?: string; error?: string } | null>(null);

  useEffect(() => {
    onSubmittingChange?.(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setLastResponse(null);
    try {
      const response = await submitLaunchNote({ topic: values.topic });
      setLastResponse({ text: response.result?.text, error: response.error });

      if (response.error) {
        antdMessage.error(response.error);
      } else if (response.result?.text) {
        antdMessage.success('Ответ получен');
      } else {
        antdMessage.success('Ответ записан');
      }

      form.resetFields();
    } catch {
      setLastResponse({ error: 'Не удалось отправить запрос к серверу.' });
      antdMessage.error('Не удалось отправить заметку');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonLabel = useMemo(() => {
    if (isRefreshing) return 'Обновляю сообщение';
    if (isSubmitting) return 'Отправка…';
    return 'Отправить';
  }, [isRefreshing, isSubmitting]);

  return (
    <div>
      <Typography.Text strong>Введите свой запрос</Typography.Text>
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="launch-form">
        <Form.Item name="topic" rules={[topicRule]}>
          <Input placeholder="Опишите тему запуска" aria-label="Тема запуска" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={isRefreshing || isSubmitting} disabled={isRefreshing}>
            {buttonLabel}
          </Button>
        </Form.Item>
      </Form>
      {lastResponse?.text && (
        <Typography.Paragraph className="launch-response" type="secondary">
          {lastResponse.text}
        </Typography.Paragraph>
      )}
      {lastResponse?.error && (
        <Typography.Paragraph className="launch-response" type="danger">
          {lastResponse.error}
        </Typography.Paragraph>
      )}
    </div>
  );
}
