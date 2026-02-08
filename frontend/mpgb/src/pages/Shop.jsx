import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { X, ShoppingCart, Tag } from 'lucide-react'; // Optional icons

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  
  // State for the Modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Fancy Material', 'Cotton Material', 'linen Cotton Material'];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await API.get('/products');
        const data = res?.data;
        let list = [];

        // Normalize different API shapes to an array
        if (Array.isArray(data)) {
          list = data;
        } else if (Array.isArray(data?.products)) {
          list = data.products;
        } else if (Array.isArray(data?.data)) {
          list = data.data;
        } else {
          console.warn('Unexpected products response shape:', data);
        }

        setProducts(list);
        setFilteredProducts(list);
      } catch (err) {
        console.error("Failed to fetch", err);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
  if (!Array.isArray(products)) return;

  if (category === 'All') {
    setFilteredProducts(products);
  } else {
    setFilteredProducts(
      products.filter(
        (p) => (p.category || '').toLowerCase() === category.toLowerCase()
      )
    );
  }
}, [category, products]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
    <h2 className='text-2xl font-semibold'>Fetching Products please wait</h2>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen relative">
      {/* Header Section */}
      <div className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">OUR COLLECTION</h1>
          <p className="text-slate-500 max-w-xl mx-auto">Premium selection crafted for quality and style.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                category === cat ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200 hover:border-orange-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {(Array.isArray(filteredProducts) ? filteredProducts : []).map((product) => (
            <div key={product._id || product.id || product.name} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <div className="relative aspect-3/4 overflow-hidden bg-slate-100 rounded-2xl mb-4">
                <img 
                  src={product.image?.url || product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <button className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    View Details
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{product.category}</p>
                <h2 className="text-lg font-bold text-slate-800">{product.name}</h2>
                <p className="text-xl font-black text-slate-900">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PRODUCT DETAIL MODAL --- */}
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
    </div>
  );
};

export default Shop;