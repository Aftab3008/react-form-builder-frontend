import { FormElementInstance } from "@/app/(root)/(dashboard)/_components/FormElements";
import { User } from "@/types";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

axios.defaults.withCredentials = true;

type DesignerStore = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (index: string) => void;

  setElements: (element: FormElementInstance[]) => void;

  selectedElement: SetStateAction<FormElementInstance | null>;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
  updateElement: (id: string, element: FormElementInstance) => void;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  signup: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ message: string }>;
  login: (data: {
    email: string;
    password: string;
  }) => Promise<{ message: string }>;
  getUser: () => void;
  logout: () => Promise<{ message: string }>;
};

export const useDesginerStore = create<DesignerStore>((set) => ({
  elements: [],
  selectedElement: null,
  addElement: (index, element) =>
    set((state) => ({
      elements: [
        ...state.elements.slice(0, index),
        element,
        ...state.elements.slice(index),
      ],
    })),
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),
    })),
  setSelectedElement: (selectedElement) => set({ selectedElement }),
  updateElement: (id, element) =>
    set((state) => ({
      elements: state.elements.map((el) => (el.id === id ? element : el)),
    })),

  setElements: (element) => set(() => ({ elements: element })),
}));

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { message: "User created successfully" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: String(error), isLoading: false });
      }
      throw error;
    }
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { message: "User logged in successfully" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error: error.response?.data?.message, isLoading: false });
      } else {
        set({ error: String(error), isLoading: false });
      }
      throw error;
    }
  },

  getUser: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/getUser`
      );
      set({
        user: response.data,
        isAuthenticated: true,
        isCheckingAuth: false,
        error: null,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error: null, isCheckingAuth: false });
      } else {
        set({ error: null, isCheckingAuth: false });
      }
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      return { message: "User logged out successfully" };
    } catch (error) {
      set({ error: "Failed to logout", isLoading: false });
      return { message: "Failed to logout" };
    }
  },
}));
