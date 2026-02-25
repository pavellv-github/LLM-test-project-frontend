import { axiosInstance } from './axiosClient';

interface LLMResult {
  text: string;
  tokens?: number;
  model?: string;
  metadata?: Record<string, unknown>;
}

export interface QueryResponsePayload {
  success: boolean;
  request_id?: number;
  result?: LLMResult;
  error?: string;
}

export async function submitLaunchNote(payload: { topic: string }): Promise<QueryResponsePayload> {
  const response = await axiosInstance.post<QueryResponsePayload>('/query', {
    prompt: payload.topic,
    model: 'gpt-3.5',
    temperature: 0.7,
    max_tokens: 256
  });

  return response.data;
}
