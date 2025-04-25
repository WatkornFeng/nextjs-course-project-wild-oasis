"use client";

import { useState } from "react";
import { User } from "../cabins/page";

export default function Counter({ users }: { users: User[] }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{users.length} users</p>

      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </div>
  );
}
