"use client";
import { useState } from "react";
const page = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="h-screen bg-orange-500 flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <input
          type="text "
          placeholder="Enter Username"
          className="bg-white px-10 py-2 rounded"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text "
          placeholder="Enter Password"
          className="bg-white px-10 py-2 rounded"
        />
        <button
          className="w-full bg-white"
        //   onClick={() => [setShowProfile(true)]}
        >
          Login
        </button>
        {/* {showProfile && <h1 className="text-white">{username}</h1>} */}
      </div>
    </div>
  );
};

export default page;
