import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css';
import './styles/animations.css';
import './styles/global.css';
import './index.css'; 

import App from './App.jsx'
import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)