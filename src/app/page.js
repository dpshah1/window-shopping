import Image from "next/image";

export default function Home() {
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
