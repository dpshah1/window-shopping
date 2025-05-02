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
import hashPassword from "./hashPassword";

export default function SignInForm() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const storeName = e.target.storeName.value.trim();
    const email = e.target.email.value.trim();
    const password = hashPassword(e.target.password.value);
    const repeatPassword = hashPassword(e.target.repeatPassword.value);

    // Basic validation
    if (!storeName || !email || !password || !repeatPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      alert("Email already in use.");
      return;
    }

    // Create new user
    const userId = Date.now().toString(); // Simple unique ID
    const newUser = {
      userId: userId,
      username: storeName,
      email: email,
      password: password
    };
    await addUser(newUser);

    // Create catalogue for this user
    await addCatalogue({
      catalogueId: Date.now().toString(),
      storeName: storeName,
      ownerId: userId,
    });

    // Redirect to dashboard
    router.push(`/dashboard/${userId}`);
    }

  return (
<form className="space-y-4" onSubmit={handleSubmit}>
          {/* Store Name Input */}
          <div>
            <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              type="text"
              id="storeName"
              placeholder="Enter your store name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
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
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Repeat Password Input */}
          <div>
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
              Repeat Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              placeholder="Repeat your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Sign Up
          </button>
        </form>
  );
};