"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    localStorage.setItem("username", name);
    router.push("/lobby");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-4">
        <input
          className="border p-2"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleContinue}
          className="bg-black text-white px-4 py-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
}