import { Link } from "react-router-dom"; // Add this line!

const Home = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-extrabold mb-4">New Season Arrivals</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Check out our latest collection of premium products curated just for you.
      </p>
      {/* This is the line that was causing the error */}
      <Link to="/shop" className="bg-black text-white px-8 py-3 rounded-full font-bold">
        Shop Now
      </Link>
    </div>
  );
};

export default Home;