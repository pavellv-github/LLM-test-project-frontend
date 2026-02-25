import type { LaunchData } from '../../entities/launch/types';
import { axiosInstance } from './axiosClient';

export async function fetchLaunchInfo(): Promise<LaunchData> {
  const response = await axiosInstance.get<LaunchData>('/posts/1');
  return response.data;
}
