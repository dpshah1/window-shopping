"use client"; // This makes the component a client component
import { useRouter } from "next/navigation";
import {
  addUser,
  getAllUsers,
  updateUser,
  addCatalogue,
  getCataloguesByOwner,
  updateCatalogue,
  addProduct,
  getProductsByCatalogue,
  updateProduct,
  getUserByEmail
} from "../lib/firestoreHelpers";

export default function LogInForm() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    //just to check the usersf
    const allUsers = await getAllUsers();
    console.log("All Users:", allUsers);

    const formData = new FormData(e.target);
    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();
    
    console.log(email, "email")
    console.log(password, "password")
    // 🚫 Check for empty fields
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    try {
      const userData = await getUserByEmail(email);

      if (!userData) {
        alert("Email not found.");
        return;
      }

      if (userData.password !== password) {
        alert("Incorrect password.");
        return;
      }

      const userId = userData.userId;
      router.push(`/dashboard/${userId}`);
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
<form className="space-y-4" onSubmit={handleSubmit} >
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Sign In
          </button>
        </form>
  );
}