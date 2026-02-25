import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1d39c4',
          borderRadius: 12
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}
