"use server";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.SERVER_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    config.headers["cookie"] = `token=${token}`;
  }
  return config;
});

class UserNotFoundErr extends Error {}

export async function getUserFromCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    throw new Error("User token is missing");
  }
  return jwtDecode<{ userId: string }>(token.value);
}

async function getCurrentUser() {
  const user = await getUserFromCookies();
  if (!user || !user.userId) throw new UserNotFoundErr();
  const { userId } = user;
  return { id: userId };
}

export async function GetFormStats() {
  const user = await getCurrentUser();
  const response = await axiosInstance.get("/api/forms/stats", {
    params: { userId: user.id },
  });
  return response.data;
}

export async function CreateForm(data: { name: string; description?: string }) {
  const user = await getCurrentUser();
  const response = await axiosInstance.post("/api/forms/create", {
    ...data,
    userId: user.id,
  });
  return response.data.formId;
}

export async function GetForm() {
  const user = await getCurrentUser();
  const response = await axiosInstance.get("/api/forms", {
    params: { userId: user.id },
  });
  return response.data;
}

export async function GetFormById(id: string) {
  const user = await getCurrentUser();
  const response = await axiosInstance.get(`/api/forms/${id}`, {
    params: { userId: user.id },
  });
  return response.data;
}

export async function UpdateFormContent(id: string, jsonContent: string) {
  const user = await getCurrentUser();
  const response = await axiosInstance.put(`/api/forms/${id}/content`, {
    userId: user.id,
    content: jsonContent,
  });
  return response.data;
}

export async function PublishForm(id: string) {
  const user = await getCurrentUser();
  const response = await axiosInstance.put(`/api/forms/${id}/publish`, {
    userId: user.id,
  });
  return response.data;
}

export async function GetFormContentByUrl(shareUrl: string) {
  const response = await axiosInstance.post("/api/forms/content", {
    shareUrl,
  });
  return response.data;
}

export async function SubmitForm(formUrl: string, content: string) {
  const response = await axiosInstance.post("/api/forms/submit", {
    formUrl,
    content,
  });
  return response.data;
}

export async function GetFormSubmissions(id: string) {
  const user = await getCurrentUser();
  const response = await axiosInstance.get(`/api/forms/${id}/submissions`, {
    params: { userId: user.id },
  });
  return response.data;
}

export async function DeleteForm(id: string) {
  const user = await getCurrentUser();
  const response = await axiosInstance.delete(`/api/forms/${id}`, {
    params: { userId: user.id },
  });
  return response.data;
}

export async function deleteElementInstance(id: string, elementId: string) {
  const user = await getCurrentUser();
  const response = await axiosInstance.put(`/api/forms/${id}/delete-element`, {
    userId: user.id,
    elementId,
  });
  return response.data;
}
