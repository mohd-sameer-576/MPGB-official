import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Categories list - you can also derive this from your product data
  const categories = [
  'All', 'Saree', 'Lehenga Choli', 'Kurti', 
  'Anarkali', 'Gown', 'Palazzo Set', 
  'Sharara Set', 'Kaftan',
];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  }, [category, products]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            OUR COLLECTION
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Browse through our premium selection of essentials crafted for quality and style.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
      key={cat}
      onClick={() => setCategory(cat)}
      className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all ${
        category === cat 
        ? 'bg-orange-600 text-white shadow-md' // Ethnic colors look great with orange/gold/maroon
        : 'bg-white text-slate-500 border border-slate-200 hover:border-orange-600'
      }`}
    >
      {cat}
    </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <div key={product._id} className="group cursor-pointer">
              {/* Image Container with Overlay */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 rounded-2xl mb-4">
                <img 
                  src={product.image?.url || product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=No+Image'; }}
                />
                {/* Subtle Quick Add Button on Hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1 px-1">
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                  {product.category}
                </p>
                <h2 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h2>
                <p className="text-xl font-black text-slate-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;