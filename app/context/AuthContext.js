"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { userApi, cartApi } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("dokany_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const normalizedUser = { ...parsedUser, role: parsedUser.role || "user" };
      setUser(normalizedUser);
      // Load cart from backend
      loadCart(normalizedUser.cartId);
    }
    setLoading(false);
  }, []);

  const loadCart = async (cartId) => {
    try {
      const response = await cartApi.getCart(cartId);
      if (response.data?.chart?.products) {
        setCart(response.data.chart.products);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  const login = async (email, password) => {
    const response = await userApi.login({ email, password });
    const userData = response.data.user;
    setUser(userData);
    localStorage.setItem("dokany_user", JSON.stringify(userData));
    await loadCart(userData.cartId);
    return userData;
  };

  const register = async (userData) => {
    const response = await userApi.register(userData);
    const newUser = response.data.user;
    setUser(newUser);
    localStorage.setItem("dokany_user", JSON.stringify(newUser));
    setCart([]);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("dokany_user");
    localStorage.removeItem("dokany_token");
  };

  const addToCart = async (productId) => {
    const newCart = [...cart, productId.toString()];
    setCart(newCart);

    if (user?.cartId) {
      try {
        await cartApi.updateCart(user.cartId, newCart);
      } catch (error) {
        console.error("Failed to update cart:", error);
      }
    }
  };

  const removeFromCart = async (productId) => {
    const index = cart.indexOf(productId.toString());
    if (index > -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);

      if (user?.cartId) {
        try {
          await cartApi.updateCart(user.cartId, newCart);
        } catch (error) {
          console.error("Failed to update cart:", error);
        }
      }
    }
  };

  const clearCart = async () => {
    setCart([]);
    if (user?.cartId) {
      try {
        await cartApi.updateCart(user.cartId, []);
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    }
  };

  const getCartCount = () => cart.length;

  const value = {
    user,
    cart,
    loading,
    login,
    register,
    logout,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
