import { useNavigate } from "react-router-dom";

export default function Selection({
  selectedCourse,
  setSelectedCourse,
  selectedWeeks,
  setSelectedWeeks,
  startQuiz,
  courses,
  weeks,
  mode,
  setMode
}) {
  const navigate = useNavigate();

  const toggleWeek = (week) => {
    if (selectedWeeks.includes(week)) {
      setSelectedWeeks(selectedWeeks.filter(w => w !== week));
    } else {
      setSelectedWeeks([...selectedWeeks, week]);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-6">

      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 max-w-3xl w-full">

        <h2 className="text-3xl font-bold mb-6 text-center">Start Practice</h2>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(Number(e.target.value))}
          className="w-full p-3 rounded-xl border mb-6"
        >
          <option value="">Choose Course</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {weeks.map(w => (
            <button
              key={w}
              onClick={() => toggleWeek(w)}
              className={`p-3 rounded-xl ${
                selectedWeeks.includes(w)
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              W{w}
            </button>
          ))}
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={() => setMode("practice")}
            className={mode === "practice"
              ? "bg-green-500 text-white px-4 py-2 rounded"
              : "bg-gray-200 px-4 py-2 rounded"}
          >
            Practice
          </button>

          <button
            onClick={() => setMode("test")}
            className={mode === "test"
              ? "bg-red-500 text-white px-4 py-2 rounded"
              : "bg-gray-200 px-4 py-2 rounded"}
          >
            Test
          </button>
        </div>

        <button
          onClick={startQuiz}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl"
        >
          Start 🚀
        </button>

      </div>
    </div>
  );
}