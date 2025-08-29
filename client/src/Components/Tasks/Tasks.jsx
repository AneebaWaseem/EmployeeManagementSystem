import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../features/users/userThunks";
import { fetchTasks, fetchOtherTasks } from "../../features/tasks/taskThunks";
import { fetchCurrentUser } from "../../features/auths/authThunks";
import { io } from "socket.io-client";
import TaskAssignForm from "./TaskAssign";
import TasksList from "./TasksMe";
import TasksOther from "./TasksOther"; 

const socket = io("http://localhost:5000");

const Tasks = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { tasks, otherTasks } = useSelector((state) => state.tasks);
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser()); 
    dispatch(fetchUsers());
    dispatch(fetchTasks());
    dispatch(fetchOtherTasks()); 
  }, [dispatch]);

  // socket listeners
  useEffect(() => {
    socket.on("taskCreated", () => {
      dispatch(fetchTasks());
      dispatch(fetchOtherTasks());
    });
    socket.on("taskUpdated", () => {
      dispatch(fetchTasks());
      dispatch(fetchOtherTasks());
    });
    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
    };
  }, [dispatch]);

  // Show loading until user is fetched
  if (loading || !user) return <p>Loading current user...</p>;

  return (
    <div className="flex flex-col items-center gap-5 w-[80vw] mt-10">
      <TaskAssignForm users={users} />
      <TasksList tasks={tasks} /> {/* Tasks assigned to current user */}
      <TasksOther tasks={otherTasks} /> {/* Tasks not assigned to current user, admin only */}
    </div>
  );
};

export default Tasks;
