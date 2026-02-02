import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  // Fetch products to show in the slider
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await API.get("/products");
        // We only take the first 6 for the slider
        setProducts(data.slice(0, 6));
      } catch (err) {
        console.error("Slider fetch failed", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* --- Hero Section --- */}
      <section className="relative h-[90vh] flex items-center justify-center bg-slate-50">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
              STANDARD.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover a curated collection of essentials designed for the modern
            lifestyle. Quality meets minimalist design.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition shadow-xl shadow-gray-200"
            >
              Explore Shop
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-10 py-4 bg-white text-black border border-gray-200 font-bold rounded-full hover:bg-gray-50 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* --- Auto-Sliding Product Section --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="px-6 mb-12 flex justify-between items-end max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Featured Items
            </h2>
            <p className="text-slate-500">Handpicked for you this week.</p>
          </div>
          <Link
            to="/shop"
            className="text-indigo-600 font-bold text-sm border-b-2 border-indigo-600 pb-1"
          >
            View All
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee pause-on-hover">
            {[...products, ...products].map((p, index) => (
              <div key={index} className="mr-4 w-64 md:w-80 flex-shrink-0">
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition duration-500">
                  <div className="h-80 overflow-hidden">
                    <img
                      src={p.image?.url}
                      alt={p.name}
                      className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 truncate">
                      {p.name}
                    </h3>
                    <p className="text-indigo-600 font-black mt-1">
                      ${p.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
