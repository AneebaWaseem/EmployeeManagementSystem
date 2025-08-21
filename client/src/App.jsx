import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GettingStarted from "./Components/GettingStarted";
import Users from "./Components/Users/Users";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import UserDetails from "./Components/Users/UserDetails";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <GettingStarted /> },
    {
      path: "users",
      element: (
        <div className="pt-20">
          <Navbar />
          <div className="flex flex-row gap-5">
            <Sidebar />
            <Users />
          </div>
        </div>
      ),
    },
    {
      path: "users/:id",
      element: (
        <div className="flex flex-row gap-5">
          <Sidebar />
          <UserDetails />
        </div>
      ),
    }, // User details route
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
