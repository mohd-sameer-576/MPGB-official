import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await API.get("/products");
        // Taking the first 3 or 4 for a clean static display
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-white">
      {/* --- Hero Section --- */}
      <section className="relative h-[85vh] flex items-center justify-center bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            New Season 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-tight mb-6 tracking-tighter">
            THE NEW <br />{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-500">
              STANDARD.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover a curated collection of essentials designed for the modern lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop" className="w-full sm:w-auto px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all shadow-xl">
              Explore Shop
            </Link>
            <Link to="/contact" className="w-full sm:w-auto px-10 py-4 bg-white text-black border border-gray-200 font-bold rounded-full hover:bg-gray-50 transition-all">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* --- Simple Product Grid --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Featured Items</h2>
            <p className="text-slate-500 mt-2">Handpicked quality, just for you.</p>
          </div>
          <Link to="/shop" className="group flex items-center text-indigo-600 font-bold">
            View All Products 
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group">
              <div className="aspect-4/5 overflow-hidden rounded-2xl bg-gray-100 mb-4">
                <img
                  src={p.image?.url}
                  alt={p.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {p.name}
              </h3>
              <p className="text-slate-500 font-medium">${p.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;