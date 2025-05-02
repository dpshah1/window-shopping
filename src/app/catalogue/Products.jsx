"use client";
import {useState, useEffect} from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductsByCatalogue, getCatalogueById } from "../lib/firestoreHelpers";

const handleAddProduct = async () => {
  const router = useRouter();
  router.push(`/dashboard/${ownerId}`)
};

const storeProducts = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const catalogueId  = params.catalogueId;
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
        console.log(fetched)
      } catch (err) {
        console.log("Failed loading products:", err);
      }
      try {
        const fetched = await getCatalogueById(catalogueId);
        ownerId = fetched[0].ownerId
      } catch (err) {
        console.log("Failed loading products:", err);
      }
    })();
  }, []);
  return(
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-4 gap-6">
          {products
            .map((product, index) => (
              <div key={index} className="bg-white border p-4 rounded shadow-sm">
                <Image
                  src={"/images/chair1.jpg"}
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
      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        <button className="text-black px-4 py-2 border rounded bg-gray-100">1</button>
        <button className="text-black px-4 py-2 border rounded bg-gray-100">2</button>
        <button className="text-black px-4 py-2 border rounded bg-gray-100">3</button>
        <button className="text-black px-4 py-2 border rounded bg-gray-100">Next</button>
      </div>
      {/* Add Product Button */}
      <div className="flex justify-end mt-8">
        <button onClick={handleAddProduct} className="bg-[#C89F85] text-white font-semibold px-6 py-3 rounded-md">
          Add Product
        </button>
      </div>
    </>
  );
}

const mockProducts = [
  {
    name: "Syltherine",
    desc: "Stylish cafe chair",
    price: 40,
    image: "/images/chair1.jpg",
  },
  {
    name: "Leviosa",
    desc: "Modern white chair",
    price: 60,
    image: "/images/chair2.jpg",
  },
  {
    name: "Lolito",
    desc: "Luxury sofa",
    price: 700,
    image: "/images/sofa.jpg",
  },
  {
    name: "Respira",
    desc: "Outdoor table and stool",
    price: 500,
    image: "/images/livingroom.jpg",
  },
  // Repeat for pagination mock-up
];

export default storeProducts