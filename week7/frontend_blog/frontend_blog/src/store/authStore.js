import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useAuth = create(
  persist(
    (set) => ({
      currentUser: null,
      loading: false,
      isAuthenticated: false,
      error: null,
      //login
      login: async (userCredWithRole) => {
        const { role, ...userCredObj } = userCredWithRole;
        try {
          //set loading true
          set(state => ({ ...state, loading: true }))
          //make api call
          let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, userCredObj, { withCredentials: true })
          //update state
          if (res.status === 200) {
            set(state => ({ ...state, loading: false, isAuthenticated: true, currentUser: res.data.payload, error: null }))
          }
        } catch (err) {
          console.log("err is ", err);
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            //error: err,
            error: err.response?.data?.message || err.response?.data?.error || "Login failed",
          });
        }

      },
      //logout
      logout: async () => {
        try {
          //set loading state
          set(state => ({ ...state, loading: true }))
          //make logout api req
          let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, { withCredentials: true })
          //update state
          if (res.status === 200) {
            set(state => ({ ...state, loading: false, isAuthenticated: false, currentUser: null, error: null }))
          }
        } catch (err) {
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            error: err.response?.data?.message || err.response?.data?.error || "Logout failed",
          });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);





