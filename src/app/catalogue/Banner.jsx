"use client"
import {React, useState, useEffect} from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { getCatalogueById } from '../lib/firestoreHelpers';

function Banner() {
  const [catalogue, setCatalogue] = useState([]);
  const [bannerUrl, setBannerUrl] = useState("https://firebasestorage.googleapis.com/v0/b/windowshop-cd3d9.firebasestorage.app/o/Banner%2F9f5ad391-3a8e-4b44-94a5-c108ecf78f39-background.png?alt=media&token=d597843e-e0c5-45d0-829b-c3f3e0ca6142")
    const params = useParams();
    const catalogueId  = params.catalogueId;
    // banner url
    useEffect(() => {
      if (!catalogueId) {
        alert("Catalogue ID not found");
        return;
      }
    
      (async () => {
        try {
          const fetched = await getCatalogueById(catalogueId);
          console.log(fetched[0])
          setBannerUrl(fetched[0].bannerImage)
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
          src={bannerUrl}
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