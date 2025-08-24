import { useParams } from "react-router-dom";
import { updateTask } from "../../features/tasks/taskThunks";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "../../@/components/ui/card";

const TaskDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  // Fetch single task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setUrl(res.data.url || "");
      } catch (err) {
        setError("Task not found");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const isAssigned = user && task && user.id === task.assignedTo;
  const isAdmin = user && user.role === "Admin";

  // Update URL
  const handleUpdateUrl = async () => {
    if (!url) return;
    const updated = await dispatch(updateTask({ id: task.id, url })).unwrap();
    setTask(updated);
  };

  // Update Status
  const handleUpdateStatus = async (status) => {
    if (status === task.status) return;
    const updated = await dispatch(updateTask({ id: task.id, status })).unwrap();
    setTask(updated);
  };

  // Update Title & Description (for admin not assigned)
  const handleUpdateTitleDesc = async () => {
    const updated = await dispatch(
      updateTask({ id: task.id, title, description })
    ).unwrap();
    setTask(updated);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!task) return null;

  return (
    <Card className="w-full md:w-[70vw] border-b-4 border-b-gray-300 shadow-lg">
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Title & Description */}
        <div className="mb-4">
          {isAdmin && !isAssigned ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-md p-2 w-full mb-2"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-md p-2 w-full"
                rows={4}
              />
              <button
                onClick={handleUpdateTitleDesc}
                className="bg-blue-600 text-white px-3 py-1 rounded-md mt-2 hover:bg-blue-700"
              >
                Update
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
              <p>{task.description}</p>
            </>
          )}
        </div>

        {/* Status - everyone can view */}
        <p className="font-semibold">
          Status:{" "}
          <span
            className={`${
              task.status === "Completed" ? "text-green-600" : "text-orange-600"
            }`}
          >
            {task.status}
          </span>
        </p>

        {/* URL - everyone can see, only assigned can edit */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-semibold">Upload URL:</label>
          {isAssigned ? (
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter file URL"
              className="border rounded-md p-2 w-full"
            />
          ) : (
            <p className="border rounded-md p-2 w-full bg-gray-100">{url || "No URL yet"}</p>
          )}
          {isAssigned && (
            <button
              onClick={handleUpdateUrl}
              className="bg-blue-600 text-white px-3 py-1 rounded-md mt-1 hover:bg-blue-700"
            >
              Update URL
            </button>
          )}
        </div>

        {/* Status dropdown - only assigned user */}
        {isAssigned && (
          <div className="flex items-center gap-3 mt-4">
            <span className="font-semibold">Update Status:</span>
            {["Pending", "In Progress", "Completed"].map((s) => {
              const isCurrent = task.status === s;
              return (
                <button
                  key={s}
                  onClick={() => handleUpdateStatus(s)}
                  className={`px-4 py-1 rounded-full font-medium transition-all ${
                    isCurrent
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "border border-gray-400 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskDetails;
