"use client";
import {useState, useEffect} from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductsByCatalogue, getCatalogueById, getCataloguesByOwner } from "../lib/firestoreHelpers";



export default function ProductPreview() {
    const [products, setProducts] = useState([]);
    const params = useParams();
    const userId = params?.userId;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            console.log(userId)
          if (!userId) {
            alert("User ID not found.");
            return;
          }
  
          const catalogues = await getCataloguesByOwner(userId);
          if (!catalogues || catalogues.length === 0) {
            alert("No catalogues found.");
            return;
          }
          console.log(catalogues);
  
          const catalogueId = catalogues[0].catalogueId;
          const fetchedProducts = await getProductsByCatalogue(catalogueId);
          setProducts(fetchedProducts);
          console.log("Fetched products:", fetchedProducts);
        } catch (err) {
          console.error("Error loading catalogue or products:", err);
        }
      };
  
      fetchData();
    }, [userId]);

  return(
    <>
    <div className="w-[250px] max-h-[600px] overflow-y-auto overflow-x-hidden -mx-1 py-1 mt-[-9px]">
        <h3 className="text-lg font-bold mb-4">Product Preview</h3>
        <div className="space-y-4 w-[230px]">
            {products.map((product, index) => (
             <div
             key={index}
             className="bg-white p-3 shadow-sm rounded w-full h-[120px] flex gap-4 items-start "
           >
             <Image
               src={product.productImage}
               alt={product.productName}
               width={80}
               height={80}
               className="rounded object-cover"
             />
             <div className="flex flex-col justify-between">
               <h3 className="text-black font-semibold text-sm">{product.productName}</h3>
               <p className="text-gray-600 text-xs truncate w-[150px]">{product.description}</p>
               <p className="text-black font-bold text-sm">${product.productPrice}</p>
             </div>
           </div>
            ))}
        </div>
    </div>
    </>
  );
}