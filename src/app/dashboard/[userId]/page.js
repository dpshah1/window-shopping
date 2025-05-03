import Layout from "../../layout";
import Image from "next/image";
import AddProductForm from "../../components/AddProductForm";
import StoreCatalogueLink from "../../components/StoreCatalogueLink";
import ProductPreview from "../../components/ProductPreview";
export default function Dashboard() {

  return (
    <main className="p-8 bg-[url('/mall.png')] bg-cover bg-center min-h-screen">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="bg-white shadow-lg rounded-lg p-4 w-1/4">
          <h3 className="text-black text-lg font-bold mb-4">Dashboard</h3>
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
            <li>
              <StoreCatalogueLink />
            </li> 
          </ul>
        </aside>

        {/* Main Content */}
        <section className="bg-white shadow-lg rounded-lg p-6 flex-1">
          <h2 className="text-black text-2xl font-bold mb-6">Admin DashBoard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-black text-lg font-bold mb-4">Add New Product</h3>
              <AddProductForm />
             
            </div>


            <ProductPreview />
          </div>
        </section>
      </div>
    </main>
  );
}