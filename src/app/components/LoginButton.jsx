"use client"; // This makes the component a client component
import { useEffect, useState } from "react"
import { useRouter, usePathname  } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); 
  
  useEffect(() => {
    // This will run every time the path changes
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, [pathname]);


  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/login");
    setIsLoggedIn(false); // force re-render
  };

  return isLoggedIn ? (
    <button
      className="text-blue-500 font-semibold mr-4"
      onClick={handleLogout}
    >
      Log Out
    </button>
  ) : (
    <button
      className="text-blue-500 font-semibold mr-4"
      onClick={() => {router.push("/login")}}
    >
      Sign In
    </button>
  );
}