"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export const Appbar = () => {
  const session = useSession();
  return (
    <div className="flex justify-between items-center bg-gray-800 p-6">
      <button onClick={() => signIn()}>Signin</button>
      <button onClick={() => signOut()}>Sign out</button>
      <div className="text-white">{JSON.stringify(session.data?.user)}</div>
    </div>
  );
};
