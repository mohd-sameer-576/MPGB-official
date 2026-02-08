import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
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
            <div className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
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
              <p className="text-slate-500 font-medium">₹{p.price}</p>
            </div>
          ))}
        </div>
        {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 ">
                  <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row relative ">
                    
                    {/* Close Button */}
                    <button 
                      onClick={() => setSelectedProduct(null)}
                      className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-red-600 transition-colors border border-slate-100 cursor-pointer"
                    >
                      <X className="w-6 h-6 text-slate-800" />
                    </button>
        
                    {/* Left: Full Size Image */}
                    <div className="w-full md:w-1/2 bg-slate-100 h-100 md:h-auto">
                      <img 
                        src={selectedProduct.image?.url || selectedProduct.image} 
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
        
                    {/* Right: Product Details */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <span className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full mb-4 w-fit uppercase">
                        <Tag className="w-3 h-3 mr-1" /> {selectedProduct.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 leading-tight">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-2xl font-bold text-orange-600 mb-6">₹{selectedProduct.price}</p>
                      
                      <div className="space-y-4 mb-8">
                        <p className="text-slate-600 leading-relaxed">
                          {selectedProduct.description || "Indulge in the elegance of this premium piece. Crafted with meticulous attention to detail, this garment combines traditional aesthetics with modern comfort."}
                        </p>
                        <ul className="text-sm text-slate-500 space-y-2">
                          <li className="flex items-center">• Premium Quality Fabric</li>
                          <li className="flex items-center">• Authentic Ethnic Design</li>
                          <li className="flex items-center">• Limited Piece</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
      </section>
    </div>
  );
};

export default Home;