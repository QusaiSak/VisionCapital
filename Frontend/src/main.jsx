import { FinancialRecordsProvider } from "@/contexts/financial-record-context.jsx"
import { ClerkProvider } from '@clerk/clerk-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <FinancialRecordsProvider>
            <App />
          </FinancialRecordsProvider>
        </ClerkProvider>
      </BrowserRouter>
  </StrictMode>,
)
