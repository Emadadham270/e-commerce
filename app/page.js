"use client";
import React, { useState, useEffect } from "react";

const ShoppingCart = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M9 19v1a1 1 0 001 1h1m0-2v2a1 1 0 001 1h1m-4-3a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1z"
    />
  </svg>
);

const Eye = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const Star = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Filter = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const Search = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Menu = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const X = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Reusable Button Component
const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300",
    success: "bg-green-600 hover:bg-green-700 text-white shadow-md",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <a
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

//===============> fetching data from the api <=============\\

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      console.log("Starting to fetch products...");

      setLoading(true);

      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      console.log("Products received:", data);

      setProducts(data);
      setError(null);
    } catch (err) {
      console.log("Error occurred:", err.message);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [cartCount, setCartCount] = useState(0);

  // 2. Add cart handler function (add this with your other functions)
  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    console.log(
      `Added ${product.title} to cart. Total items: ${cartCount + 1}`
    );
  };

  const ProductCard = ({ product, onAddToCart }) => {
    const formatPrice = (price) => {
      return `$${price.toFixed(2)}`;
    };

    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + "...";
    };

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <img
            src={`${product.image}`}
            alt={product.title}
            className="h-full w-full object-contain p-4 hover:scale-105 transition-all duration-500	"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="mb-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium capitalize">
              {product.category}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 text-lg mb-2">
            {truncateText(product.title, 50)}
          </h3>

          <p className="text-gray-600 text-sm mb-4">
            {truncateText(product.description, 100)}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">E-Commerce Store</h1>

      {loading && (
        <div className="text-center">
          <p className="text-xl">Loading products...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-600">
          <p className="text-xl">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div>
          <header className="bg-white shadow-md mb-8 p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">E-Commerce Store</h1>

              <div className="relative">
                <Button variant="outline">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </header>
          <p className="mb-4">Found {products.length} products!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
