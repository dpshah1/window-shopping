"use client"; // This makes the component a client component
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  return (
    <button
      className="text-blue-500 font-semibold mr-4"
      onClick={() => router.push("/login")} // Navigate to /login
    >
      Sign In
    </button>
  );
}