import { useState, useEffect } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", category: "", description: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("image", image);

    try {
      await API.post("/products", data);
      alert("Product added!");
      fetchProducts();
    } catch (err) {
      alert("Error adding product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await API.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      
      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8 grid grid-cols-2 gap-4">
        <input type="text" placeholder="Name" className="border p-2" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="number" placeholder="Price" className="border p-2" onChange={e => setFormData({...formData, price: e.target.value})} />
        <input type="text" placeholder="Category" className="border p-2" onChange={e => setFormData({...formData, category: e.target.value})} />
        <input type="file" className="border p-2" onChange={e => setImage(e.target.files[0])} />
        <textarea placeholder="Description" className="border p-2 col-span-2" onChange={e => setFormData({...formData, description: e.target.value})} />
        <button className="bg-blue-600 text-white p-2 rounded col-span-2">Add Product</button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <img src={p.image?.url} alt={p.name} className="h-40 w-full object-cover mb-2" />
            <h3 className="font-bold">{p.name}</h3>
            <p>${p.price}</p>
            <button onClick={() => handleDelete(p._id)} className="text-red-500 mt-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;