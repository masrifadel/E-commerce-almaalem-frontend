import Link from "next/link";

const page = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  console.log(users);

  return (
    <div>
      {users.map((user: any) => (
        <Link key={user.id} href={`/users/${user.id}`}>
          {user.name}
        </Link>
      ))}
    </div>
  );
};

export default page;
