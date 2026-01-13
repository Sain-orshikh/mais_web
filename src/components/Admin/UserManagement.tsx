"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthUser } from "../../hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from '../../config/api';
import toast from "react-hot-toast";
import { FaUserPlus, FaTrash, FaUserShield, FaUserEdit, FaUser, FaArrowLeft } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Admin {
  _id: string;
  username: string;
  permission: string;
  createdAt: string;
}

const UserManagement = () => {
  const { data: authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    permission: "admin" as "super_admin" | "admin" | "editor",
  });

  // Check if user has permission
  if (authUser && authUser.permission !== 'super_admin') {
    return <Navigate to="/admin" replace />;
  }

  // Fetch all admins
  const { data: admins, isLoading } = useQuery<Admin[]>({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/admins`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },
  });

  // Create admin mutation
  const createMutation = useMutation({
    mutationFn: async (adminData: typeof formData) => {
      const res = await fetch(`${API_BASE_URL}/api/admins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      toast.success("Admin account created successfully!");
      setShowCreateForm(false);
      setFormData({ username: "", password: "", permission: "admin" });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create admin");
    },
  });

  // Delete admin mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/admins/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      toast.success("Admin account deleted successfully!");
      setDeleteConfirm(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete admin");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    createMutation.mutate(formData);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case "super_admin":
        return <FaUserShield className="text-purple-600" />;
      case "admin":
        return <FaUserEdit className="text-blue-600" />;
      case "editor":
        return <FaUser className="text-green-600" />;
      default:
        return <FaUser className="text-gray-600" />;
    }
  };

  const getPermissionBadgeColor = (permission: string) => {
    switch (permission) {
      case "super_admin":
        return "bg-purple-100 text-purple-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "editor":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">User Management</h1>
            <p className="text-sm text-gray-500">Manage admin accounts and permissions</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <FaUserPlus />
            <span>Create New Admin</span>
          </button>
        </div>
      </div>

      {/* Admin List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins?.map((admin) => (
              <tr key={admin._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {getPermissionIcon(admin.permission)}
                    <span className="text-sm font-medium text-gray-900">{admin.username}</span>
                    {admin._id === authUser?._id && (
                      <span className="text-xs text-gray-500 italic">(You)</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPermissionBadgeColor(admin.permission)}`}>
                    {admin.permission.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {admin._id !== authUser?._id && (
                    <button
                      onClick={() => setDeleteConfirm(admin._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {admins?.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No admin accounts found
          </div>
        )}
      </div>

      {/* Create Admin Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Create New Admin</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permission Level
                </label>
                <select
                  value={formData.permission}
                  onChange={(e) => setFormData({ ...formData, permission: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  {createMutation.isPending ? "Creating..." : "Create Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this admin account? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteMutation.isPending}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
