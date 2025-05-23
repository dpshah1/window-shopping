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
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

export default function Home() {
  const [catalogues, setCatalogues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleClickCatalog = (id) => {
    router.push(`/catalogue/${id}`);
    console.log(`You clicked: ${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const fetched = await getCatalogues();
        setCatalogues(fetched);
        console.log(fetched);
      } catch (err) {
        console.log("Failed loading catalogues:", err);
      }
    })();
  }, []);

  const fuse = new Fuse(catalogues, {
    keys: ["storeName", "description"],
    threshold: 0.3,
  });

  const filteredCatalogues = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : catalogues;

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="p-8 bg-[url('/mall.png')] bg-cover bg-center min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8">Pick Your Store</h2>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search for a store..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCatalogues.map((catalogue) => (
            <div
              key={catalogue.catalogueId}
              onClick={() => handleClickCatalog(catalogue.catalogueId)}
              className="bg-white shadow-lg rounded-lg overflow-hidden catalog-card"
            >
              <Image
                src={catalogue.bannerImage}
                alt="Clothing Store"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{catalogue.storeName}</h3>
                <p className="text-gray-600">{catalogue.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
