"use client";
import React, { useState } from "react";
import Login from "./login";
import Profile from "./profile";
import { LoginContext } from "../../Contexts/LoginContext";
const page = () => {
  const [showProfile, setShowProfile] = useState(true);

  return (
    <div>
      <LoginContext.Provider
        value={{ user: "John", login: () => {}, logout: () => {} }}
      >
        {showProfile ? <Profile /> : <Login />}
      </LoginContext.Provider>
    </div>
  );
};

export default page;
