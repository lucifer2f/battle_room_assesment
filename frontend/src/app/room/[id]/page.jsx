"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";

export default function RoomPage() {

  const [prompt, setPrompt] = useState("");
  const [submissions, setSubmissions] = useState([]);




  // FETCH SUBMISSIONS

  const fetchSubmissions = async () => {

    try {

      const response = await api.get(
        "/submissions"
      );

      setSubmissions(response.data);

    } catch (error) {

      console.log(error);

    }

  };




  // POLLING

  useEffect(() => {

    fetchSubmissions();

    const interval = setInterval(() => {

      fetchSubmissions();

    }, 2000);

    return () => clearInterval(interval);

  }, []);




  // SUBMIT

  const handleSubmit = async () => {

    if (!prompt) return;

    try {

      const response = await api.post(
        "/submit",
        {
          username: "Sandesh",
          prompt: prompt,
        }
      );



      setSubmissions((prev) => [
        response.data,
        ...prev,
      ]);



      setPrompt("");

    } catch (error) {

      console.log(error);

    }

  };




  return (

    <div className="min-h-screen bg-black text-white p-6">

      {/* ROOM HEADER */}

      <div className="border border-gray-700 p-4 rounded-lg mb-6">

        <h1 className="text-3xl font-bold">
          Battle Room
        </h1>

        <p className="text-gray-400 mt-2">
          Room Code: ABC123
        </p>

      </div>




      {/* CHALLENGE SECTION */}

      <div className="border border-gray-700 p-4 rounded-lg mb-6">

        <h2 className="text-2xl font-semibold mb-2">
          Current Challenge
        </h2>

        <p className="text-gray-300">
          Create the most insane luxury cyberpunk perfume campaign for Gen-Z.
        </p>

        <div className="mt-4">

          <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
            Round Active
          </span>

        </div>

      </div>




      {/* PARTICIPANTS */}

      <div className="border border-gray-700 p-4 rounded-lg mb-6">

        <h2 className="text-2xl font-semibold mb-4">
          Participants
        </h2>

        <div className="space-y-2">

          <div className="border p-3 rounded">
            Sandesh
          </div>

          <div className="border p-3 rounded">
            Alex
          </div>

        </div>

      </div>




      {/* SUBMISSION FORM */}

      <div className="border border-gray-700 p-4 rounded-lg mb-6">

        <h2 className="text-2xl font-semibold mb-4">
          Submit Your Prompt
        </h2>

        <textarea
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="Write your creative prompt..."
          rows={5}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        />

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Prompt
        </button>

      </div>




      {/* SUBMISSION FEED */}

      <div className="border border-gray-700 p-4 rounded-lg">

        <h2 className="text-2xl font-semibold mb-4">
          Submission Feed
        </h2>


        {submissions.map((sub) => (

          <div
            key={sub.id}
            className="bg-gray-900 p-4 rounded-lg mb-4"
          >

            <p>
              <strong>User:</strong>
              {" "}
              {sub.username}
            </p>

            <p className="mt-2">
              <strong>Prompt:</strong>
              {" "}
              {sub.prompt}
            </p>




            {/* STATUS */}

            <p className="mt-2">

              <strong>Status:</strong>
              {" "}

              <span
                className={
                  sub.status === "queued"
                    ? "text-yellow-400"
                    : sub.status === "running"
                    ? "text-blue-400"
                    : "text-green-400"
                }
              >
                {sub.status}
              </span>

            </p>




            {/* OUTPUT */}

            {sub.output && (

              <div className="mt-3 p-3 bg-black rounded">

                <p>
                  <strong>AI Output:</strong>
                </p>

                <p className="text-gray-300 mt-2 whitespace-pre-wrap">
                  {sub.output}
                </p>

              </div>

            )}




            {/* SCORE */}

            {sub.score > 0 && (

              <div className="mt-3">

                <span className="bg-purple-600 px-3 py-1 rounded-full">
                  Score: {sub.score}/10
                </span>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}