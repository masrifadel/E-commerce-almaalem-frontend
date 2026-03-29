import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "About Us | Name of Website",
  description: "A lot of keywords",
  keywords: ["about", "us", "website"],
  authors: [{ name: "John Doe" }],
};

async function makePostRequest() {
  const response = await fetch("http://localhost:3000/api/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "John" }),
  });
  const data = await response.json();
  console.log(data);
  return { data };
}
const page = async () => {
  const { data } = await makePostRequest();
  return <div>{data.message}</div>;
};

export default page;
