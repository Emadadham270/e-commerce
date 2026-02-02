const API_BASE_URL = "http://localhost:3002";

// User API calls
export const userApi = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Registration failed");
    }
    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Login failed");
    }
    return data;
  },

  getUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to get user");
    }
    return data;
  },

  updateUser: async (userId, updates) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to update user");
    }
    return data;
  },
};

// Cart (Chart) API calls
export const cartApi = {
  getCart: async (cartId) => {
    const response = await fetch(`${API_BASE_URL}/charts/${cartId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to get cart");
    }
    return data;
  },

  updateCart: async (cartId, products) => {
    const response = await fetch(`${API_BASE_URL}/charts/${cartId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to update cart");
    }
    return data;
  },

  getAllCarts: async () => {
    const response = await fetch(`${API_BASE_URL}/charts`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to get carts");
    }
    return data;
  },
};
