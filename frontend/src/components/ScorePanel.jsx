'use client';

export default function ScorePanel({ scores = [] }) {
  const sortedScores = [...scores].sort((a, b) => (b.score || 0) - (a.score || 0));

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Leaderboard</h3>
      
      <div className="space-y-3">
        {sortedScores.length === 0 ? (
          <p className="text-gray-500">No scores yet</p>
        ) : (
          sortedScores.map((entry, idx) => (
            <div
              key={entry.userId}
              className={`flex items-center justify-between p-3 rounded-lg ${
                idx === 0
                  ? 'bg-yellow-100 border-2 border-yellow-400'
                  : idx === 1
                  ? 'bg-gray-100 border-2 border-gray-400'
                  : idx === 2
                  ? 'bg-orange-100 border-2 border-orange-300'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg text-gray-700">#{idx + 1}</span>
                <span className="font-semibold text-gray-800">{entry.userName}</span>
              </div>
              <span className="font-bold text-lg text-blue-600">{entry.score}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
