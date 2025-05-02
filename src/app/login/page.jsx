import Layout from "../layout";
import Image from "next/image";
import LogInForm from "../components/LogInForm"

export default function Login() {
  return (
    <main className="p-8 bg-[url('/mall.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <LogInForm/>
        <div className="mt-4 text-center">
          <p className="text-sm">
            New Member? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
          </p>
          <p className="text-sm">
            <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</a>
          </p>
        </div>
      </div>
    </main>
  );
}