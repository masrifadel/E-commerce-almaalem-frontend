import React from "react";
import { notFound } from "next/navigation";
const fetchUser = async (userId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  const user = await response.json();
  return user;
};
const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const user = await fetchUser(userId);
  if (!user) {
    console.log("User not found");
    notFound();
  }
  return <div>{user.username}</div>;
};

export default page;
