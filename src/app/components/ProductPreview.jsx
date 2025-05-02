"use client";
import {useState, useEffect} from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductsByCatalogue, getCatalogueById } from "../lib/firestoreHelpers";



export default function ProductPreview () {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const catalogueId  = params.catalogueId;
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

  const handleAddProduct = async () => {
    const catalogueId = params?.catalogueId;

    const catalogue = await getCatalogueById(catalogueId);
    const userId = catalogue[0].ownerId

    if (!userId) {
      alert("User ID not found");
      return;
    }

    router.push(`/dashboard/${userId}`)
  };

  return(
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-4 gap-6">
          {products
            .map((product, index) => (
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
    </>
  );
}