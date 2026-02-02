import { useState, useEffect } from "react";
import API from "../api/axios";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="p-20 text-center">Loading our collection...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shop All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="group border rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img 
                src={product.image?.url} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-blue-600 uppercase font-semibold">{product.category}</p>
              <h3 className="font-medium text-gray-900 mt-1">{product.name}</h3>
              <p className="text-lg font-bold mt-2">${product.price}</p>
              <button className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;