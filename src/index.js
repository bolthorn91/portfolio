import './css/main.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'context/AuthContext';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);

reportWebVitals();
