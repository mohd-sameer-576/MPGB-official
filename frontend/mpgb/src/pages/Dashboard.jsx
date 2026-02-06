import { useState, useEffect } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiPlus, FiTrash2, FiPackage } from "react-icons/fi"; // Optional: npm install react-icons

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("image", image);

    try {
      await API.post("/products", data);
      alert("Product added successfully!");
      setFormData({ name: "", price: "", category: "", description: "" });
      setImage(null);
      e.target.reset(); // Reset file input
      fetchProducts();
    } catch (err) {
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex ">
      {/* Sidebar - Aesthetic Fixed Navigation */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col p-6 fixed h-full">
        <h2 className="text-2xl font-black mb-10 tracking-tight text-indigo-400">
          ADMIN PANEL
        </h2>
        <nav className="flex space-y-4 flex-col h-full">
          <div className="flex items-center gap-3 text-indigo-300 bg-slate-800 p-3 rounded-lg">
            <FiPackage /> <span>Inventory</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-400 hover:text-white transition p-3 hover:border-2 rounded-lg cursor-pointer"
          >
            <FiLogOut /> <span>Logout</span>
          </button>
        </nav>
      </aside>
      {/* Mobile Header - Only shows on small screens */}
      

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Product Management
              </h1>
              <p className="text-slate-500">
                Add, edit, or remove items from your shop.
              </p>
            </div>
          </header>

          {/* Aesthetic Form Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
            <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold text-lg">
              <FiPlus className="text-indigo-600" /> <h3>Add New Product</h3>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Product Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Premium Cotton Tee"
                  className="w-full border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none border transition"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Price (₹)
                </label>
                <input
                  required
                  type="number"
                  placeholder="49.99"
                  className="w-full border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none border transition"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Category
                </label>
                <select
                  className="w-full border-slate-200 rounded-lg p-3 outline-none border transition focus:ring-2 focus:ring-orange-500"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  value={formData.category}
                >
                  <option value="">Kaftan</option>
                  <option value="Saree">Saree</option>
                  <option value="Salwar Kameez">Palazoo set</option>
                  <option value="Lehenga Choli">Lehenga Choli</option>
                  <option value="Kurti">Kurti</option>
                  <option value="Anarkali">Anarkali</option>
                  <option value="Anarkali">Gown</option>
                  <option value="Anarkali">Sharara Set</option>
                  {/* Add the rest of your categories here */}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Product Image
                </label>
                <input
                  required
                  type="file"
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-600">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe the material, fit, etc."
                  className="w-full border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none border transition"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <button
                disabled={loading}
                className="md:col-span-2 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:bg-slate-400 cursor-pointer"
              >
                {loading ? "Uploading to Cloudinary..." : "Publish Product"}
              </button>
            </form>
          </section>

          {/* Product Grid */}
          <h3 className="text-xl font-bold text-slate-800 mb-6">
            Current Inventory ({products.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image?.url}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                    ₹{p.price}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                    {p.category}
                  </span>
                  <h3 className="font-bold text-slate-800 text-lg mb-1 truncate">
                    {p.name}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                    {p.description}
                  </p>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex items-center gap-2 text-red-500 font-semibold text-sm hover:text-red-700 transition"
                  >
                    <FiTrash2 /> Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="md:col-span-2 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:bg-slate-400 cursor-pointer"
          >
            <FiLogOut /> <span>Logout</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
