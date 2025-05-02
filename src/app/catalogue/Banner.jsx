"use client"
import {React, useState, useEffect} from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { getCatalogueById } from '../lib/firestoreHelpers';

function Banner() {
  const [catalogue, setCatalogue] = useState([]);
    const params = useParams();
    const catalogueId  = params.catalogueId;
    
    useEffect(() => {
      if (!catalogueId) {
        alert("Catalogue ID not found");
        return;
      }
    
      (async () => {
        try {
          const fetched = await getCatalogueById(catalogueId);
          console.log(fetched[0])
          setCatalogue(fetched[0])
        } catch (err) {
          console.log("Failed loading products:", err);
        }
      })();
    }, []);

  return (
    <>
      <div className="relative w-full h-60">
        <Image
          src="/images/chair1.jpg"
          alt="Shop banner"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl font-bold">{catalogue.storeName}</h1>
          <p className="text-lg">This is the Shop description</p>
        </div>
      </div>
    </>
  )
}

export default Banner