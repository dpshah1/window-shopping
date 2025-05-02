"use client";

import { useParams, useRouter } from "next/navigation";
import { getCataloguesByOwner } from "../lib/firestoreHelpers";

export default function StoreCatalogueLink() {
  const router = useRouter();
  const params = useParams();

  const handleClick = async (e) => {
    e.preventDefault();

    const userId = params?.userId;
    if (!userId) {
      alert("User ID not found");
      return;
    }

    const catalogues = await getCataloguesByOwner(userId);
    if (!catalogues || catalogues.length === 0) {
      alert("Catalogue not found.");
      return;
    }

    const catalogueId = catalogues[0].catalogueId;
    router.push(`/catalogue/${catalogueId}`);
  };

  return (
    <a href="#" onClick={handleClick} className="text-blue-500 hover:underline">
      Store Catalogue
    </a>
  );
}