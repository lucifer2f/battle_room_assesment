'use client';

export default function ParticipantsList({ participants = [] }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Participants</h3>
      
      <div className="space-y-3">
        {participants.length === 0 ? (
          <p className="text-gray-500">No participants yet</p>
        ) : (
          participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{participant.name}</p>
                <p className="text-sm text-gray-500">{participant.role || 'Member'}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${participant.online ? 'bg-green-500' : 'bg-gray-400'}`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
