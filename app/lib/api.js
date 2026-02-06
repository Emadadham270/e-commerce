const API_BASE_URL = "http://localhost:3002";

// Helper to get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("dokany_token");
  }
  return null;
};

// Helper to create headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

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
    // Store token if present
    if (data.data?.token) {
      localStorage.setItem("dokany_token", data.data.token);
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
    // Store token if present
    if (data.data?.token) {
      localStorage.setItem("dokany_token", data.data.token);
    }
    return data;
  },

  getUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to get user");
    }
    return data;
  },

  updateUser: async (userId, updates) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to update user");
    }
    return data;
  },

  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to fetch users");
    }
    return data;
  },

  deleteUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to delete user");
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem("dokany_token");
    localStorage.removeItem("dokany_user");
  },
};

// Cart (Chart) API calls
export const cartApi = {
  getCart: async (cartId) => {
    const response = await fetch(`${API_BASE_URL}/charts/${cartId}`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to get cart");
    }
    return data;
  },

  updateCart: async (cartId, products) => {
    const response = await fetch(`${API_BASE_URL}/charts/${cartId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ products }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to update cart");
    }
    return data;
  },

  getAllCarts: async () => {
    const response = await fetch(`${API_BASE_URL}/charts`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.data?.message || "Failed to get carts");
    }
    return data;
  },
};
