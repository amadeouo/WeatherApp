import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { LocalStorageProvider } from "@/app/context/LocalStorageProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalStorageProvider>
      <BrowserRouter basename="/WeatherApp">
        <App />
      </BrowserRouter>
    </LocalStorageProvider>
  </StrictMode>,
)
