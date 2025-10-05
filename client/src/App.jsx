
import './App.css';
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MainLayout from './components/MainLayout';


function App() {
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
    ],
  },
])

export default App
