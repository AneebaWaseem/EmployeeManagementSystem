import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent } from "../../@/components/ui/card";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";

const TasksOther = ({ tasks }) => {
  const { user } = useSelector((state) => state.auth);

  // Only Admin can see
  if (!user || user.role !== "Admin") return null;

  return (
    <Motion.div
      className="flex flex-wrap justify-around items-center gap-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
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
      <Card className="w-[90vw] md:w-[70vw] border-b-4 border-b-gray-300 shadow-lg flex flex-col">
        <CardContent className="flex flex-col gap-4 p-6">
          <h2 className="text-xl font-bold mb-4">Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="p-3 rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 flex flex-col gap-1"
                >
                  {/* Title link to details */}
                  <Link
                    to={`/tasks/${t.id}`}
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {t.title}
                  </Link>
                  <span className="text-sm text-gray-700">
                    Assigned to: {t.assignee?.fullName || "N/A"}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      t.status === "Completed" ? "text-green-600" : "text-orange-600"
                    }`}
                  >
                    Status: {t.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </Motion.div>
  );
};

export default TasksOther;
