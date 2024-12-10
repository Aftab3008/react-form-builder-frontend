"use server";

import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

class UserNotFoundErr extends Error {}

async function getCurrentUser() {
  const user = { id: "userId123" };
  if (!user) throw new UserNotFoundErr();
  return user;
}

export async function GetFormStats() {
  const user = await getCurrentUser();
  const response = await axios.get(`${API_BASE_URL}/forms/stats`, {
    params: { userId: user.id },
  });
  return response.data;
}

export async function CreateForm(data: { name: string; description?: string }) {
  const user = await getCurrentUser();
  const response = await axios.post(`${API_BASE_URL}/forms/create`, {
    ...data,
    userId: user.id,
  });
  return response.data.formId;
}

export async function GetForm() {
  const user = await getCurrentUser();
  const response = await axios.get(`${API_BASE_URL}/forms`, {
    params: { userId: user.id },
  });
  return response.data;
}

export async function GetFormById(id: String) {
  const user = await getCurrentUser();
  const response = await axios.get(`${API_BASE_URL}/forms/${id}`, {
    params: { userId: user.id },
  });
  return response.data;
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const user = await getCurrentUser();
  const response = await axios.put(`${API_BASE_URL}/forms/${id}/content`, {
    userId: user.id,
    content: jsonContent,
  });
  return response.data;
}

export async function PublishForm(id: number) {
  const user = await getCurrentUser();
  const response = await axios.put(`${API_BASE_URL}/forms/${id}/publish`, {
    userId: user.id,
  });
  return response.data;
}

export async function GetFormContentByUrl(shareUrl: string) {
  const response = await axios.post(`${API_BASE_URL}/forms/content`, {
    shareUrl,
  });
  return response.data;
}

export async function SubmitForm(formUrl: string, content: string) {
  const response = await axios.post(`${API_BASE_URL}/forms/submit`, {
    formUrl,
    content,
  });
  return response.data;
}

export async function GetFormSubmissions(id: String) {
  const user = await getCurrentUser();
  const response = await axios.get(`${API_BASE_URL}/forms/${id}/submissions`, {
    params: { userId: user.id },
  });
  return response.data;
}

export async function DeleteForm(id: number) {
  const user = await getCurrentUser();
  const response = await axios.delete(`${API_BASE_URL}/forms/${id}`, {
    params: { userId: user.id },
  });
  return response.data;
}

export async function deleteElementInstance(id: number, elementId: string) {
  const user = await getCurrentUser();
  const response = await axios.put(
    `${API_BASE_URL}/forms/${id}/delete-element`,
    {
      userId: user.id,
      elementId,
    }
  );
  return response.data;
}
