import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './Routes/Routes.jsx'

import {
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './providers/AuthProvider.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <div className="conatainer mx-auto max-w-7xl">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </React.StrictMode>,
)
