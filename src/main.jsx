import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { LoginStudent } from './LoginStudent'
import App from './App'
import { Apps } from './App1'
import { UnAssigned } from './pages/UnAssigned'
createRoot(document.getElementById('root')).render(
  <StrictMode>
        <App />
        {/* <UnAssigned /> */}
  </StrictMode>,
)
