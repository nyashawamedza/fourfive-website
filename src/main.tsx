
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Collections from './pages/Collections'
import About from './pages/About'
import Contact from './pages/Contact'
import DesignDetail from './pages/DesignDetail'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/collections', element: <Collections /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/design/:id', element: <DesignDetail /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
)
