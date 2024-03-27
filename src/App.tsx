import './App.css';
import { ThemeCustomization } from '@/themes';
import { AppRouter } from './routes';
import { AuthProvider } from './components';

function App() {
  return (
    <ThemeCustomization>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeCustomization>
  );
}

export default App;

