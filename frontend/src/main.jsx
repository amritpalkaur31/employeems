import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthContext>
    <App />
  </AuthContext>
  </React.StrictMode>,
)

