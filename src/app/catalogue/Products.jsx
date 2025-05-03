"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductsByCatalogue, getCatalogueById } from "../lib/firestoreHelpers";
import Fuse from "fuse.js";

const storeProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  const params = useParams();
  const catalogueId = params.catalogueId;
  const router = useRouter();
  let ownerId;

  useEffect(() => {
    if (!catalogueId) {
      alert("Catalogue ID not found");
      return;
    }

    (async () => {
      try {
        const fetched = await getProductsByCatalogue(catalogueId);
        setProducts(fetched);
        setFilteredProducts(fetched);
      } catch (err) {
        console.log("Failed loading products:", err);
      }
      try {
        const fetched = await getCatalogueById(catalogueId);
        ownerId = fetched[0].ownerId;
      } catch (err) {
        console.log("Failed loading catalogue:", err);
      }
    })();
  }, []);

  useEffect(() => {
    let results = products;

    // Fuse.js Search
    if (searchTerm.trim()) {
      const fuse = new Fuse(products, {
        keys: ["productName", "description"],
        threshold: 0.5,
      });
      results = fuse.search(searchTerm).map(res => res.item);
    }

    // Price Filter
    results = results.filter((product) => {
      const price = parseFloat(product.productPrice);
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      return (
        (!minPrice || price >= min) &&
        (!maxPrice || price <= max)
      );
    });

    setFilteredProducts(results);
  }, [searchTerm, minPrice, maxPrice, products]);

  const handleAddProduct = async () => {
    const catalogue = await getCatalogueById(catalogueId);
    const userId = catalogue[0].ownerId;

    if (!userId) {
      alert("User ID not found");
      return;
    }

    router.push(`/dashboard/${userId}`);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 border rounded w-full md:w-1/6"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border rounded w-full md:w-1/6"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={index} className="bg-white border p-4 rounded shadow-sm">
              <Image
                src={product.productImage}
                alt={product.productName}
                width={300}
                height={300}
                className="w-full h-64 object-cover mb-2"
              />
              <h3 className="text-black font-semibold text-lg">{product.productName}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-black font-bold mt-1">${product.productPrice}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Button */}
      <div className="flex justify-end mt-8 px-4">
        <button onClick={handleAddProduct} className="bg-[#C89F85] text-white font-semibold px-6 py-3 rounded-md">
          Add Product
        </button>
      </div>
    </>
  );
};

export default storeProducts;
