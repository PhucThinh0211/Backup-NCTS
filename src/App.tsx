import { Helmet, HelmetProvider } from 'react-helmet-async';

import './App.css';
import "@/common/featureTextRich.css";
import "@/common/ckcontent.css";
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { ThemeCustomization } from '@/themes';
import { AppRouter } from './routes';
import { AuthProvider, ReduxStoreProvider } from './components';
import './translations';

const helmetContext = {};

function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <title>Noi Bai Cargo Terminal Services</title>
        <link rel="ncts" href="https://ncts.vn" />
      </Helmet>
      <ReduxStoreProvider>
        <ThemeCustomization>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ThemeCustomization>
      </ReduxStoreProvider>
    </HelmetProvider>
  );
}

export default App;

