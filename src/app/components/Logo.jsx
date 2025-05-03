"use client"; // This makes the component a client component
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginButton() {
  const router = useRouter();

  return (
    <Image
      src="/logo.png" // Replace with your logo path
      alt="Window Shop Logo"
      width={80}
      height={80}
      onClick={() => router.push("/")}
    />
  );
}