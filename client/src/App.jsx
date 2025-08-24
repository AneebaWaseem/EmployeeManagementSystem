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

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(fetchCurrentUser());
}, [dispatch]);

  const router = createBrowserRouter([
    { path: "/", element: <GettingStarted /> },
    {
      path: "users",
      element: (
        <div className="pt-20">
          <Navbar />
          <div className="flex flex-row justify-around w-[90vw]">
            <Sidebar />
            <Users />
          </div>
        </div>
      ),
    },
    {
      path: "users/:id",
      element: (
        <div className="pt-30">
          <Navbar />
        <div className="flex flex-row justify-around w-[90vw]">
          <Sidebar />
          <UserDetails />
        </div>
        </div>
      ),
    }, // User details route
    {
      path: "tasks",
      element: (
        <div className="pt-30">
          <Navbar />
          <div className="flex flex-row justify-around w-[90vw]">
            <Sidebar />
            <Tasks />
          </div>
        </div>
      ),
    },
    {
      path: "tasks/:id",
      element: (
        <div className="pt-30">
          <Navbar />
        <div className="flex flex-row justify-around w-[90vw]">
          <Sidebar />
          <TaskDetails />
        </div>
        </div>
      ),
    }, // task details
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
