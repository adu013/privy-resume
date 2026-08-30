import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './assets/css/app.css'
import './assets/css/preview.css'
import './assets/css/print.css'

// Preview Layout
import './assets/css/layout-classic.css'
import './assets/css/layout-modern.css'

// Print Layout
import './assets/css/print-classic.css'
import './assets/css/print-modern.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
