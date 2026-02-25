import { Providers } from './providers/Providers';
import { MainPage } from '../pages/MainPage/MainPage';

export function App() {
  return (
    <Providers>
      <MainPage />
    </Providers>
  );
}
