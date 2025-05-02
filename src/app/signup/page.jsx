import Layout from "../layout";
import Image from "next/image";
import SignUpForm from "../components/SignUpForm"
export default function SignUp() {
  return (
    <main className="p-8 bg-[url('/mall.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Store</h2>
        <SignUpForm />

        {/* Additional Links */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already a Member? <a href="/login" className="text-blue-500 hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </main>
  );
}
