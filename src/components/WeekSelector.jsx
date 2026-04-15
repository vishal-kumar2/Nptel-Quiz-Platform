export default function WeekSelector({
  weeks,
  selectedWeeks,
  setSelectedWeeks,
}) {
  return (
    <>
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setSelectedWeeks(weeks)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Select All
        </button>

        <button
          onClick={() => setSelectedWeeks([])}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {weeks.map((w) => (
          <button
            key={w}
            onClick={() => {
              if (selectedWeeks.includes(w)) {
                setSelectedWeeks(selectedWeeks.filter(x => x !== w));
              } else {
                setSelectedWeeks([...selectedWeeks, w]);
              }
            }}
            className={`p-3 rounded ${
              selectedWeeks.includes(w)
                ? "bg-indigo-600 text-white"
                : "bg-white shadow"
            }`}
          >
            {w}
          </button>
        ))}
      </div>
    </>
  );
}