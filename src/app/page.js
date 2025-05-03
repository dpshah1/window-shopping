"use client"; // This makes the component a client component
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import {
  getAllUsers,
  getCataloguesByOwner,
  updateCatalogue,
  addProduct,
  getProductsByCatalogue,
  updateProduct,
  addUser,
  updateUser,
  addCatalogue,
} from "./lib/firestoreHelpers";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stores] = useState([
    {
      name: "Clothing Store",
      description: "Selling Best Clothes",
      image: "/store1.png",
    },
    {
      name: "Electronics Store",
      description: "Latest gadgets and devices",
      image: "/store2.png",
    },
    {
      name: "Home Decor",
      description: "Stylish furniture and lighting",
      image: "/store3.png",
    },
  ]);

  // Memoize Fuse instance for performance
  const fuse = useMemo(() => {
    return new Fuse(stores, {
      keys: ["name", "description"],
      threshold: 0.5, // Lower = stricter matching
    });
  }, [stores]);

  const filteredStores = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : stores;

  useEffect(() => {
    async function testHelpers() {
      try {
        // Optional: test Firestore helpers
      } catch (err) {
        console.error("Error testing firestore helpers:", err);
      }
    }

    testHelpers();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="p-8 bg-[url('/mall.png')] bg-cover bg-center min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8">Pick Your Store</h2>

        {/* Search Input */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full max-w-md rounded-md border shadow-sm"
          />
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredStores.map((store, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <Image
                src={store.image}
                alt={store.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{store.name}</h3>
                <p className="text-gray-600">{store.description}</p>
              </div>
            </div>
          ))}

          {filteredStores.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No stores found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
