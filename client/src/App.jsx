import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GettingStarted from "./Components/GettingStarted";
import Users from "./Components/Users/Users";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import UserDetails from "./Components/Users/UserDetails";
import Tasks from "./Components/Tasks/Tasks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/auths/authThunks";
import TaskDetails from "./Components/Tasks/TaskDetails";
import ProfileSettings from "./Components/Settings/ProfileSettings";

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const hasUser = localStorage.getItem("user");
    if (!hasUser) {
      dispatch(fetchCurrentUser()); 
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    { path: "/", element: <GettingStarted /> },
    {
      path: "users",
      element: (
        <div>
          <Navbar />
          <div className="pt-20 flex flex-row justify-around gap-10 w-[95vw] lg-w-[100vw]">
            <Sidebar />
            <Users />
          </div>
        </div>
      ),
    },
    {
      path: "users/:id",
      element: (
        <div>
          <Navbar />
        <div className="pt-20 flex flex-row justify-around gap-10 w-[95vw] lg-w-[100vw]">
          <Sidebar />
          <UserDetails />
        </div>
        </div>
      ),
    }, // User details route
    {
      path: "tasks",
      element: (
        <div>
          <Navbar />
          <div className="pt-20 flex flex-row justify-around gap-10 w-[95vw] lg-w-[100vw]">
            <Sidebar />
            <Tasks />
          </div>
        </div>
      ),
    },
    {
      path: "tasks/:id",
      element: (
        <div>
          <Navbar />
        <div className="pt-20 flex flex-row justify-around gap-10 w-[95vw] lg-w-[100vw]">
          <Sidebar />
          <TaskDetails />
        </div>
        </div>
      ),
    }, // task details
    {
      path: "settings",
      element: (
        <div>
          <Navbar />
          <div className="pt-20 flex flex-row justify-around gap-10 w-[95vw] lg-w-[100vw]">
            <Sidebar />
            <ProfileSettings />
          </div>
        </div>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
