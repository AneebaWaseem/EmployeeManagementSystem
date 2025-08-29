import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTask } from "../../features/tasks/taskThunks";
import { Card, CardContent } from "../../@/components/ui/card";
import { motion as Motion } from "motion/react"

const TaskAssign = ({ users }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Loading current user...</p>;

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.assignedTo) return;
    dispatch(createTask(form));
    setForm({ title: "", description: "", assignedTo: "" });
  };

  if (user.role !== "Admin") return null; // hide if not Admin

  return (
    <Motion.div
    className="flex flex-wrap justify-around items-center gap-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 150, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 50,
        type: "spring",
        bounce: 0.9,
        stiffness: 50,
        damping: 18,
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
    <Card className="w-[90vw] md:w-[70vw] border-b-4 border-b-gray-300 shadow-lg">
      <CardContent className="flex flex-col gap-4 p-6">
        <h2 className="text-2xl font-bold mb-4">Assign Task</h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="font-semibold">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-3 rounded-md w-full border shadow-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={4}
            className="p-3 rounded-md w-full border shadow-sm"
          />
        </div>

        {/* Assigned To */}
        <div>
          <label htmlFor="assignedTo" className="font-semibold">
            Assign To <span className="text-red-500">*</span>
          </label>
          <select
            id="assignedTo"
            value={form.assignedTo}
            onChange={(e) =>
              setForm({ ...form, assignedTo: e.target.value })
            }
            className="p-3 rounded-md w-full border shadow-sm"
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.fullName} ({u.role})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-[#092936] text-white p-3 rounded-md mt-4 hover:bg-[#081f29]"
        >
          Assign Task
        </button>
      </CardContent>
    </Card>
    </Motion.div>
  );
};

export default TaskAssign;
