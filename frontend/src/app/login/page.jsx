"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LobbyPage() {

  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");

  const handleCreateRoom = () => {

    // temporary fake room id
    const roomId = Math.random()
      .toString(36)
      .substring(2, 8);

    router.push(`/room/${roomId}`);
  };

  const handleJoinRoom = () => {

    if (!roomCode) return;

    router.push(`/room/${roomCode}`);
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">

      <h1 className="text-4xl font-bold text-white mb-4">
        Welcome to Battle Room!
      </h1>

      <button
        onClick={handleCreateRoom}
        className="px-6 py-3 bg-green-600 text-white rounded-lg"
      >
        Create Room
      </button>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) =>
            setRoomCode(e.target.value)
          }
          className="px-4 py-2 rounded border"
        />

        <button
          onClick={handleJoinRoom}
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
        >
          Join Room
        </button>

      </div>

    </div>
  );
}