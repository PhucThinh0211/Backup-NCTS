import './App.css';
import { ThemeCustomization } from '@/themes';
import { AppRouter } from './routes';
import { AuthProvider, ReduxStoreProvider } from './components';

function App() {
  return (
    <ReduxStoreProvider>
      <ThemeCustomization>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeCustomization>
    </ReduxStoreProvider>
  );
}

export default App;

