import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GettingStarted from './Components/GettingStarted'
import Users from './Components/Users'
function App() {
const router = createBrowserRouter([
  // {
    // path: '/', 
    // // element: <Layout />,
    // children: [
      { path: '/', element: <GettingStarted /> },
      { path: 'users', element: <Users /> },
    // ]
  // }
])
  return (
    <>
      <RouterProvider router ={router}/>
    </>
  )
}

export default App
