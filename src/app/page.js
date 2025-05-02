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
} from "./lib/firestoreHelpers";

export default function Home() {
  useEffect(() => {
    async function testHelpers() {
      try {

        // === USER TEST ===
        // const newUserId = Date.now();
        // await addUser({ userId: newUserId, username: "user" , password:"1234", email:"example@berkeley.edu"});

        // const allUsers = await getAllUsers();
        // console.log("All Users:", allUsers);

        // await updateUser(newUserId, { username: "updated_user", password:"1234", email:"example@berkeley.edu"});
        // console.log("Updated user with user_id:", newUserId);

        // const allUsers1 = await getAllUsers();
        // console.log("All Users:", allUsers1);

        // === CATALOGUE TEST ===
        // const newCatalogueId = newUserId + 1;
        // await addCatalogue({
        //   catalogueId: newCatalogueId,
        //   storeName: "Original Store",
        //   ownerId: newUserId,
        // });

        // const catalogues = await getCataloguesByOwner(newUserId);
        // console.log("Catalogues for user:", newUserId, catalogues);

        // await updateCatalogue(newCatalogueId, {
        //   storeName: "Updated Store Name",
        // });
        // console.log("Updated catalogue with catalogue_id:", newCatalogueId);

        // const catalogues1 = await getCataloguesByOwner(newUserId);
        // console.log("Catalogues for user:", newUserId, catalogues1);

        // === PRODUCT TEST ===
        // const newProductId = newCatalogueId + 1;
        // await addProduct({
        //   productId: newProductId,
        //   catalogueId: newCatalogueId,
        //   productName: "Original Product",
        //   productPrice: 25.0,
        //   productImage: "https://via.placeholder.com/150",
        // });

        // const catalogueProducts = await getProductsByCatalogue(newCatalogueId);
        // console.log(
        //   "Products in catalogue:",
        //   newCatalogueId,
        //   catalogueProducts
        // );

        // await updateProduct(newProductId, {
        //   productName: "Updated Product",
        //   productPrice: 19.99,
        // });
        // console.log("Updated product with productId:", newProductId);

        // const catalogueProducts1 = await getProductsByCatalogue(newCatalogueId);
        // console.log(
        //   "Products in catalogue:",
        //   newCatalogueId,
        //   catalogueProducts1
        // );
      } catch (err) {
        console.error("Error testing firestore helpers:", err);
      }
    }

    testHelpers();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <main className="p-8 bg-[url('/mall.png')] bg-cover bg-center min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8">Pick Your Store</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Store Card */}
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

          {/* Repeat Store Cards */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/store2.png" // Replace with your image path
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

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/store3.png" // Replace with your image path
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
        </div>
      </main>
    </div>
  );
}
