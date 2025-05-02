import Layout from "../../layout";
import Image from "next/image";

const products = [
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

export default function Catalogue() {
  return (
    <div>
      {/* Banner */}
      <div className="relative w-full h-60">
        <Image
          src="/background.png"
          alt="Shop banner"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl font-bold">Shop A</h1>
          <p className="text-lg">This is the Shop description</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-4 gap-6">
          {Array(4)
            .fill(products)
            .flat()
            .map((product, index) => (
              <div key={index} className="bg-white border p-4 rounded shadow-sm">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover mb-2"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.desc}</p>
                <p className="text-black font-bold mt-1">${product.price}</p>
              </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          <button className="px-4 py-2 border rounded bg-gray-100">1</button>
          <button className="px-4 py-2 border rounded bg-gray-100">2</button>
          <button className="px-4 py-2 border rounded bg-gray-100">3</button>
          <button className="px-4 py-2 border rounded bg-gray-100">Next</button>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-end mt-8">
          <button className="bg-[#C89F85] text-white font-semibold px-6 py-3 rounded-md">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
