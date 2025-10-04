import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
])

export default App
