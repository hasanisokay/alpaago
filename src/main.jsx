import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";
import {
  RouterProvider,
} from "react-router-dom";

import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider';
import { router } from './routes/Routes';
import { Toaster } from "react-hot-toast";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
        <Toaster />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
