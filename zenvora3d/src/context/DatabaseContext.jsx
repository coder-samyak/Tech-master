import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../utils/initialData';

const DEFAULT_API_URL = "https://techmasterbackend.onrender.com/api/v1";
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL?.trim();
  if (!envUrl) return DEFAULT_API_URL;
  const normalized = envUrl.replace(/\/+$|\/api\/v1\/*$/i, "");
  return normalized.endsWith("/api/v1") ? normalized : `${normalized}/api/v1`;
};

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(() => {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...initialData, ...parsed };
      } catch (e) {}
    }
    return initialData;
  });

  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('zenvora_auth');
    if (savedAuth) {
      try {
        return JSON.parse(savedAuth); // { user, token, isLoggedIn: true }
      } catch (e) {}
    }
    return { user: null, token: "", isLoggedIn: false };
  });

  const [notifications, setNotifications] = useState([
    { id: "not-1", text: "New booking enquiry from Gabriella Rossi (Dolce & Gabbana)", type: "enquiry", unread: true, time: "2 hours ago" },
    { id: "not-2", text: "Resume uploaded by Rohan Varma for Editor opening", type: "career", unread: true, time: "4 hours ago" },
    { id: "not-3", text: "System Auto-Backup completed successfully", type: "system", unread: false, time: "Yesterday" }
  ]);

  const persistAuth = (nextAuth) => {
    setAuth(nextAuth);
    if (typeof window !== 'undefined') {
      localStorage.setItem('zenvora_auth', JSON.stringify(nextAuth));
    }
  };

  // Unified API caller helper
  const apiFetch = async (path, options = {}) => {
    const savedAuth = localStorage.getItem('zenvora_auth');
    let token = "";
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        token = parsed.token || "";
      } catch (e) {}
    }

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    if (options.body instanceof FormData) {
      delete headers["Content-Type"];
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      ...options,
      headers,
      credentials: "include"
    });

    if (response.status === 401) {
      persistAuth({ user: null, token: "", isLoggedIn: false });
      localStorage.removeItem('zenvora_auth');
      throw new Error("Session expired. Please log in again.");
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  };

  const syncSectionToBackend = async (key, value) => {
    try {
      await apiFetch('/cms/update', {
        method: 'POST',
        body: JSON.stringify({ key, value })
      });

      if (typeof window !== 'undefined') {
        const syncPayload = { key, timestamp: Date.now() };
        localStorage.setItem('techmaster-cms-last-updated', JSON.stringify(syncPayload));
        window.dispatchEvent(new CustomEvent('techmaster-cms-updated', { detail: syncPayload }));
      }
    } catch (error) {
      console.error(`Failed to sync ${key} to backend:`, error);
    }
  };

  const fetchCMSData = async () => {
    try {
      let localParsed = {};
      try {
        const saved = localStorage.getItem('zenvora_db');
        if (saved) localParsed = JSON.parse(saved);
      } catch (e) {}

      const res = await apiFetch("/cms").catch(() => null);
      const backendData = (res && res.success && res.data) ? res.data : {};

      setDb(prev => {
        const merged = {
          ...initialData,
          ...prev,
          ...localParsed,
          ...backendData
        };
        localStorage.setItem('zenvora_db', JSON.stringify(merged));
        return merged;
      });
    } catch (error) {
      console.error("Failed to fetch CMS state:", error);
    }
  };

  // Sync with MongoDB backend, BroadcastChannel cross-tab sync & local changes with periodic polling
  useEffect(() => {
    fetchCMSData();
    const interval = setInterval(fetchCMSData, 5000);

    let channel;
    try {
      channel = new BroadcastChannel("zenvora_cms_sync");
      channel.onmessage = (event) => {
        if (event.data && event.data.type === "NEW_ENQUIRY" && event.data.enquiry) {
          const newLead = event.data.enquiry;
          setDb(prev => {
            const currentContactEnquiries = Array.isArray(prev.contactEnquiries) ? prev.contactEnquiries : [];
            const currentEnquiries = Array.isArray(prev.enquiries) ? prev.enquiries : [];
            
            const updatedContactEnquiries = [newLead, ...currentContactEnquiries.filter(e => e.id !== newLead.id)];
            const updatedEnquiries = [newLead, ...currentEnquiries.filter(e => e.id !== newLead.id)];

            const nextDb = {
              ...prev,
              contactEnquiries: updatedContactEnquiries,
              enquiries: updatedEnquiries
            };
            localStorage.setItem('zenvora_db', JSON.stringify(nextDb));
            return nextDb;
          });
        }
      };
    } catch (e) {
      console.warn("BroadcastChannel listener setup error:", e);
    }

    const handleStorage = (e) => {
      if (e.key === 'zenvora_db' || e.key === 'techmaster-cms-last-updated') {
        fetchCMSData();
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', fetchCMSData);

    return () => {
      clearInterval(interval);
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', fetchCMSData);
    };
  }, [auth.isLoggedIn]);

  // Login handler
  const login = async (email = 'admin@gmail.com', password = 'Admin@123') => {
    try {
      const res = await apiFetch("/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      
      if (res.success && res.data) {
        const authData = {
          user: {
            id: res.data.admin.id,
            name: res.data.admin.name,
            email: res.data.admin.email,
            role: res.data.admin.role,
            imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
            status: "Active"
          },
          token: res.data.token,
          isLoggedIn: true
        };
        persistAuth(authData);
        return { success: true };
      }
      return { success: false, message: "Login authentication failed." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await apiFetch("/admin/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout request to backend skipped:", e);
    }
    persistAuth({ user: null, token: "", isLoggedIn: false });
    localStorage.removeItem('zenvora_auth');
  };

  // Profile update handler
  const updateProfile = async (updatedFields) => {
    setAuth(prev => {
      if (!prev.isLoggedIn || !prev.user) return prev;
      const updatedUser = { ...prev.user, ...updatedFields };
      const nextAuth = { ...prev, user: updatedUser };
      localStorage.setItem('zenvora_auth', JSON.stringify(nextAuth));
      return nextAuth;
    });

    if (auth.user) {
      setDb(prev => {
        const list = prev.users || [];
        const updatedList = list.map(item => item.id === auth.user.id ? { ...item, ...updatedFields } : item);
        
        void syncSectionToBackend("users", updatedList);

        return { ...prev, users: updatedList };
      });
    }
  };

  // Password change
  const changePassword = async (currentPass, newPass) => {
    try {
      const res = await apiFetch("/admin/change-password", {
        method: "PUT",
        body: JSON.stringify({
          oldPassword: currentPass,
          newPassword: newPass,
          confirmPassword: newPass
        })
      });
      return { success: true, message: res.message || "Password updated successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Forgot password mock
  const requestPasswordReset = async (email) => {
    try {
      const res = await apiFetch("/admin/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email })
      });
      return { success: true, message: res.message || "Reset link sent to your registered email address." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Generic CRUD: Add
  const addItem = (collection, item) => {
    const newItem = {
      id: `${collection.slice(0, 3)}-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isActive: true,
      ...item
    };

    setDb(prev => {
      const list = prev[collection] || [];
      const updatedList = [newItem, ...list];

      void syncSectionToBackend(collection, updatedList);

      const nextDb = { ...prev, [collection]: updatedList };
      localStorage.setItem('zenvora_db', JSON.stringify(nextDb));
      return nextDb;
    });
  };

  // Generic CRUD: Update
  const updateItem = (collection, id, updatedFields) => {
    setDb(prev => {
      const list = prev[collection] || [];
      const updatedList = list.map(item => item.id === id ? { ...item, ...updatedFields } : item);

      void syncSectionToBackend(collection, updatedList);

      const nextDb = { ...prev, [collection]: updatedList };
      localStorage.setItem('zenvora_db', JSON.stringify(nextDb));
      return nextDb;
    });
  };

  // Generic CRUD: Delete
  const deleteItem = (collection, id) => {
    setDb(prev => {
      const list = prev[collection] || [];
      const updatedList = list.filter(item => item.id !== id);

      void syncSectionToBackend(collection, updatedList);

      const nextDb = { ...prev, [collection]: updatedList };
      localStorage.setItem('zenvora_db', JSON.stringify(nextDb));
      return nextDb;
    });
  };

  // Delete Nested Item (Helper for Services)
  const deleteNestedItem = (sectionName, listKey, id) => {
    setDb(prev => {
      const list = prev[sectionName]?.[listKey] || [];
      const updatedList = list.filter(item => String(item.id) !== String(id));
      const updatedSection = {
        ...prev[sectionName],
        [listKey]: updatedList
      };

      void syncSectionToBackend(sectionName, updatedSection);

      const nextDb = { ...prev, [sectionName]: updatedSection };
      localStorage.setItem('zenvora_db', JSON.stringify(nextDb));
      return nextDb;
    });
  };

  // Quick Status Toggle
  const toggleStatus = (collection, id) => {
    setDb(prev => {
      const list = prev[collection] || [];
      const updatedList = list.map(item => {
        if (item.id === id) {
          if (collection === 'resumes') {
            const nextStatus = item.status === 'New' ? 'Reviewed' : item.status === 'Reviewed' ? 'Rejected' : 'New';
            return { ...item, status: nextStatus };
          }
          if (collection === 'enquiries') {
            const nextStatus = item.status === 'Unread' ? 'Read' : 'Unread';
            return { ...item, status: nextStatus };
          }
          return { ...item, isActive: !item.isActive };
        }
        return item;
      });

      void syncSectionToBackend(collection, updatedList);

      const nextDb = { ...prev, [collection]: updatedList };
      localStorage.setItem('zenvora_db', JSON.stringify(nextDb));
      return nextDb;
    });
  };

  const updateSection = (sectionName, data, legacyPayload) => {
    setDb(prev => {
      // Handle the case where the caller used the 3-argument pattern: updateSection(key, null, payload)
      const payload = (data === null && legacyPayload !== undefined) ? legacyPayload : data;
      const isArray = Array.isArray(payload);
      const updatedSection = isArray ? payload : {
        ...prev[sectionName],
        ...payload
      };

      void syncSectionToBackend(sectionName, updatedSection);

      const nextDb = { ...prev, [sectionName]: updatedSection };
      localStorage.setItem('zenvora_db', JSON.stringify(nextDb));
      return nextDb;
    });
  };

  // Mark notification as read
  const markNotificationRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <DatabaseContext.Provider value={{
      db,
      auth,
      notifications,
      login,
      logout,
      changePassword,
      requestPasswordReset,
      addItem,
      updateItem,
      deleteItem,
      deleteNestedItem,
      toggleStatus,
      updateSection,
      updateProfile,
      markNotificationRead,
      clearAllNotifications,
      refreshDatabase: fetchCMSData,
      apiFetch
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
