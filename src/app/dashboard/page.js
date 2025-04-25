import Layout from "../layout";
import Image from "next/image";
export default function Dashboard() {
  return (
    <main className="p-8 bg-[url('/mall.png')] bg-cover bg-center min-h-screen">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="bg-white shadow-lg rounded-lg p-4 w-1/4">
          <h3 className="text-lg font-bold mb-4">Dashboard</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Add New Product
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Manage Products
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Store Settings
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <section className="bg-white shadow-lg rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-bold mb-6">Admin DashBoard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add New Product Form */}
            <div>
              <h3 className="text-lg font-bold mb-4">Add New Product</h3>
              <form className="space-y-4">
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
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                >
                  Add Product
                </button>
              </form>
            </div>

            {/* Product Preview */}
            <div>
              <h3 className="text-lg font-bold mb-4">Product Preview</h3>
              <div className="space-y-4">
                {/* Product Card */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h4 className="font-bold">Acoustic Guitar</h4>
                  <p className="text-sm text-gray-600">
                    Warm-toned wooden guitar perfect for beginners or seasoned players. Great for
                    home sessions or live performances.
                  </p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Edit
                  </button>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h4 className="font-bold">Jean Jacket</h4>
                  <p className="text-sm text-gray-600">
                    Classic denim jacket with a timeless fit. Versatile layering piece for any
                    casual outfit.
                  </p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Edit
                  </button>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h4 className="font-bold">Sofa</h4>
                  <p className="text-sm text-gray-600">
                    Modern 3-seater sofa with soft fabric and minimal design. Adds comfort and style
                    to any living room.
                  </p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}