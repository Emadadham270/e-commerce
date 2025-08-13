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

const ArrowLeft = ({ className }) => (
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
      d="M15 19l-7-7 7-7"
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

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm !== "") {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price
    filtered = filtered.filter((product) => product.price <= priceRange);

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange]);

  //===============> fetching data from the api <=============\\

  const fetchProducts = async () => {
    try {
      console.log("Starting to fetch products...");
      setLoading(true);

      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch("https://fakestoreapi.com/products"),
        fetch("https://fakestoreapi.com/products/categories"),
      ]);

      if (!productsResponse.ok || !categoriesResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const productsData = await productsResponse.json();
      const categoriesData = await categoriesResponse.json();

      console.log("Products received:", productsData);
      console.log("Categories received:", categoriesData);

      setProducts(productsData);
      setCategories(categoriesData);
      setFilteredProducts(productsData);
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

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    console.log(
      `Added ${product.title} to cart. Total items: ${cartCount + 1}`
    );
  };

  const ProductCard = ({ product, onAddToCart, onViewProduct }) => {
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
        <div className="h-64 bg-gray-100 flex items-center justify-center relative group">
          <img
            src={product.imag}
            alt={product.title}
            className="h-full w-full object-contain p-4 hover:scale-105 transition-all duration-500"
          />

          {/* View Details Button - appears on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onViewProduct(product)}
              className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </div>
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

          <p className="text-gray-600 text-sm mb-3">
            {truncateText(product.description, 100)}
          </p>

          {/* Star Rating */}
          <div className="mb-3">
            <StarRating rating={product.rating?.rate || 4.5} />
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onViewProduct(product)}
              className="flex-shrink-0"
            >
              <Eye className="w-4 h-4" />
            </Button>
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

  const ProductDetails = ({ product, onClose, onAddToCart }) => {
    const formatPrice = (price) => {
      return `$${price.toFixed(2)}`;
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Product Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-96 object-contain"
                />
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                <div className="mb-4">
                  <StarRating
                    rating={product.rating?.rate || 4.5}
                    size="w-5 h-5"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    {product.rating?.count || 120} reviews
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => onAddToCart(product)}
                    className="flex-1"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StarRating = ({ rating, maxStars = 5, size = "w-4 h-4" }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {/* Full stars */}
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <Star
              key={`full-${i}`}
              className={`${size} text-yellow-400`}
              filled={true}
            />
          ))}

        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className={`${size} text-gray-300`} filled={true} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={`${size} text-yellow-400`} filled={true} />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <Star
              key={`empty-${i}`}
              className={`${size} text-gray-300`}
              filled={true}
            />
          ))}

        <span className="text-sm text-gray-600 ml-1">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };
  return (
    <div className="p-8 bg-white">
      <div className="bg-white shadow-md mb-8 p-4 rounded-lg">
        <div className="flex justify-between items-center gap-4 flex-col sm:flex-row">
          <h1 className="text-3xl font-bold text-blue-600">Dokany</h1>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cart */}
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
      </div>
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
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Filter by Category:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === ""
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
              <div>
                <h3 className="text-lg font-semibold ">
                  Max Price: ${priceRange}
                </h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>
            </div>
          </div>
          {/* Show search results info */}
          <p className="mb-4">
            {searchTerm
              ? `Found ${filteredProducts.length} products matching "${searchTerm}"`
              : `Found ${filteredProducts.length} products!`}
          </p>

          {filteredProducts.length === 0 ? (
            /* No products found message */
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try searching with different keywords
              </p>
              <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
            </div>
          ) : (
            /* Display filtered products */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewProduct={handleViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
