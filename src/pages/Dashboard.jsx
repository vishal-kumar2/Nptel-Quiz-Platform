import { useEffect, useState } from "react";
import { getAttempts } from "../services/attempts";

export default function Dashboard({ user }) {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempts = async () => {
      const { data, error } = await getAttempts(user.id);

      if (!error) setAttempts(data);
      setLoading(false);
    };

    fetchAttempts();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">
        Your Test History
      </h2>

      {attempts.length === 0 ? (
        <p className="text-gray-500">
          No attempts yet. Start practicing!
        </p>
      ) : (
        <div className="grid gap-4">
          {attempts.map((a, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow border flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  Course ID: {a.course_id}
                </p>

                <p className="text-sm text-gray-500">
                  Weeks: {a.weeks?.join(", ")}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(a.created_at).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-indigo-600">
                  {a.score} / {a.total}
                </p>

                <p className="text-sm text-gray-500">
                  {Math.round((a.score / a.total) * 100)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}