'use client';

export default function ChallengeBox({ challenge }) {
  if (!challenge) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <p className="text-gray-600">Waiting for challenge...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{challenge.title}</h2>
      
      <p className="text-gray-700 mb-4">{challenge.description}</p>
      
      {challenge.requirements && (
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">Requirements:</h3>
          <ul className="list-disc list-inside space-y-2">
            {challenge.requirements.map((req, idx) => (
              <li key={idx} className="text-gray-700">
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {challenge.timeLimit && (
        <div className="text-lg font-semibold text-blue-600">
          ⏱️ Time Limit: {challenge.timeLimit} minutes
        </div>
      )}
    </div>
  );
}
