export default function ProgressBar({ attempted, total }) {
  return (
    <div className="w-full max-w-3xl mb-6">
      <p className="text-sm mb-1">
        Attempted: {attempted} / {total}
      </p>

      <div className="h-3 bg-gray-200 rounded-full">
        <div
          className="h-3 bg-indigo-600 rounded-full"
          style={{ width: `${(attempted / total) * 100}%` }}
        />
      </div>
    </div>
  );
}