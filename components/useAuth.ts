import { useState, useEffect, useCallback } from "react";
import { BACKEND_URL } from "./apiConfig";

// User object structure matching login API response
export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

const TOKEN_KEY = "tcd_auth_token";  // localStorage key for auth token
const USER_KEY  = "tcd_auth_user";   // localStorage key for user object

/**
 * useAuth - Custom React hook for handling user authentication state.
 * Reads token from localStorage so login persists across page refreshes.
 */
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true); // True while checking localStorage on mount

  // Load saved auth state from localStorage when the app first loads
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      const savedUser  = localStorage.getItem(USER_KEY);

      if (savedToken && savedUser) {
        // Parse the saved user JSON back into an object
        const parsedUser: AuthUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch {
      // If localStorage parse fails, clear corrupted data
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    setLoading(false);
  }, []);

  /**
   * login - Sends email/password to backend, saves token + user in localStorage
   */
  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        // Save token and user info to localStorage for persistence
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || "Login failed." };
      }
    } catch {
      return { success: false, message: "Connection failed. Please try again." };
    }
  }, []);

  /**
   * register - Sends username/email/password to backend for new account creation
   */
  const register = useCallback(async (username: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/register.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      return { success: data.success, message: data.message || "Registration failed." };
    } catch {
      return { success: false, message: "Connection failed. Please try again." };
    }
  }, []);

  /**
   * logout - Clears token and user from localStorage and resets state
   */
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  // Returns whether user is currently logged in
  const isLoggedIn = user !== null;

  return { user, loading, isLoggedIn, login, register, logout };
}
