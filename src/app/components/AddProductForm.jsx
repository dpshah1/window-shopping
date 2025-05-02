"use client"; // This makes the component a client component
import { useRouter, useParams  } from "next/navigation";
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

export default function AddProductForm() {
    const router = useRouter();
    const params = useParams();
    const userId = params?.userId;
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const productName = e.target.productName.value.trim();
      const description = e.target.description.value.trim();
      const productPrice = parseFloat(e.target.productPrice.value);
  
      if (!productName || !description || isNaN(productPrice)) {
        alert("Please fill out all fields.");
        return;
      }
      console.log(userId, "userId");
      const catalogues = await getCataloguesByOwner(userId);
      if (!catalogues || catalogues.length === 0) {
        alert("Catalogue not found for this user.");
        return;
      }
  
      const catalogueId = catalogues[0].catalogueId;
      const productId = Date.now().toString();
  
      const productData = {
        catalogueId: catalogueId,
        productId: productId,
        productImage: "https://via.placeholder.com/150",
        productName: productName,
        productPrice: productPrice,
        description: description,
      };
  
      try {
        await addProduct(productData);
        alert("Product added successfully!");
      } catch (err) {
        console.error("Failed to add product:", err);
        alert("Error adding product.");
      }

      console.log(await getProductsByCatalogue(catalogueId));
    };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
    <div>
      <label
        htmlFor="productName"
        className="block text-sm font-medium text-gray-700"
      >
        Product Name
      </label>
      <input
        type="text"
        id="productName"
        placeholder="Enter product name"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label
        htmlFor="productImages"
        className="block text-sm font-medium text-gray-700"
      >
        Product Images
      </label>
      <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
        <p className="text-gray-500">Drag and drop images here, or click to upload</p>
      </div>
    </div>

    <div>
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700"
      >
        Description
      </label>
      <textarea
        id="description"
        placeholder="Enter product description"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>
    <div>
        <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-700"
        >
            Product Price ($)
        </label>
        <input
            type="number"
            step="0.01"
            id="productPrice"
            placeholder="Enter product price"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
{/* TODO, implement category and maybe make filter in the future */}
    {/* <div>
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700"
      >
        Category
      </label>
      <select
        id="category"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option>Select Category</option>
        <option>Electronics</option>
        <option>Clothing</option>
        <option>Furniture</option>
      </select>
    </div> */}

    <button
      type="submit"
      className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
      onSubmit={handleSubmit}
    >
      Add Product
    </button>
  </form>

  );
};