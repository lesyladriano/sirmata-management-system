import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { ContextProvider } from './context/admin/ContextProvider.jsx'
import './index.css'
import router from './router.jsx'
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ContextProvider>
      <RouterProvider router={router}/>
  </ContextProvider>
  <ThemeProvider>
    <App/>
  </ThemeProvider>
  </React.StrictMode>,
)
