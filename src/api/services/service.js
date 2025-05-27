// src/api/services/service.js

import axiosInstance from "../../utils/axios_instance";

export const getUsers = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get("/users", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const unactiveUser = async (userId) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.post("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const getOrders = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get("/orders", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
export const updateOrderProgress = async (orderId, progress) => {
  try {
    const response = await axiosInstance.put(`/orders/${orderId}`, {
      progress,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const getData = async (path, page = 1, limit = 5) => {
  try {
    const response = await axiosInstance.get(`/${path}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createData = async (path, productData) => {
  try {
    const response = await axiosInstance.post(`/${path}`, productData);
    // console.log(response)
    // console.log(path,productData)
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const editData = async (path, id, data) => {
  try {
    const response = await axiosInstance.put(`/${path}/${id}`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(`Error editing data at /${path}/${id}:`, error);
    throw error;
  }
};
export const deleteData = async (path, productId) => {
  try {
    const response = await axiosInstance.delete(`/${path}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
