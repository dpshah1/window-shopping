"use client";
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
import {useState} from "react"
import { imgDB } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function SignInForm() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  let bannerUrl = "https://drive.google.com/file/d/1DVCb-HSh3g9P_hIdMKVvB6CgkOW3BOE8/view?usp=sharing"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storeName = e.target.storeName.value.trim();
    const storeDescription = e.target.storeDescription.value.trim();
    const email = e.target.email.value.trim();
    const password = hashPassword(e.target.password.value);
    const repeatPassword = hashPassword(e.target.repeatPassword.value);

    // Basic validation
    if (!storeName || !email || !password || !repeatPassword) {
      alert("Please fill in all fields.");
      return;
    }

    console.log(storeDescription)
    console.log(storeDescription.length)

    if (storeDescription.length > 250){
      alert(`Description must be smaller than 250 characters.
            \n Currently sitting at ${storeDescription.length}.`);
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

    if (imageFile) {
      try {
        const safeName = imageFile.name.replace(/\s+/g, "_");
        const storagePath = `Banner/${v4()}-${safeName}`;
        const fileRef = ref(imgDB, storagePath);
    
        console.log("Uploading to:", storagePath);
        const snapshot = await uploadBytes(fileRef, imageFile);
        console.log("Upload successful:", snapshot);
        bannerUrl = await getDownloadURL(snapshot.ref);
        console.log("Download URL:", bannerUrl);
      } catch (uploadErr) {
        console.error("🔥 Image upload failed:", uploadErr);
        alert("Image upload failed. Please check your internet connection and try again.");
        return;
      }
    }

    // Create new user
    const userId = Date.now().toString(); // Simple unique ID
    const newUser = {
      userId: userId,
      username: storeName,
      email: email,
      password: password, 
    };
    await addUser(newUser);

    // Create catalogue for this user
    await addCatalogue({
      catalogueId: Date.now().toString(),
      storeName: storeName,
      description: storeDescription,
      bannerImage: bannerUrl,
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
              className="text-gray-500 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Store Name Input */}
          <div>
            <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
              Store Description
            </label>
            <input
              type="text"
              id="storeDescription"
              placeholder="Enter description"
              className="text-gray-500 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              className="text-gray-500 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Image Input */}
          <div>
            <label
              htmlFor="productImages"
              className="block text-sm font-medium text-gray-700"
            >
              Banner Image
            </label>

            <input
              type="file"
              accept="image/*"
              id="productImage"
              className="mt-1 block w-full text-sm text-gray-500"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
              <p className="text-gray-500">
                Drag and drop images here, or click to upload
              </p>
            </div>
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
              className="text-gray-500 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              className="text-gray-500 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/*Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Sign Up
          </button>
        </form>
  );
}