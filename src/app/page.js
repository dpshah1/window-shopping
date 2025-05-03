"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./lib/firebase";
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
  deleteAllDocs,
  getCatalogues
} from "./lib/firestoreHelpers";

export default function Home() {

  const [catalogues, setCatalogues] = useState(null);

  useEffect(()=>{
          (async () => {
            try {
              const fetched = await getCatalogues();
              setCatalogues(fetched)
              console.log(fetched)
            } catch (err) {
              console.log("Failed loading catalogues:", err);
            }
          })();
  },[])

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <main className="p-8 bg-[url('/mall.png')] bg-cover bg-center min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8">Pick Your Store</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catalogues.map((catalogue, index) => (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/store1.png" // Replace with your image path
              alt="Clothing Store"
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Clothing Store</h3>
              <p className="text-gray-600">Selling Best Clothes</p>
            </div>
          </div>
          ))
          }
        </div>
      </main>
    </div>
  );
}
