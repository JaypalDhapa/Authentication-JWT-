const API_URL = "http://localhost:3000/api/login";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_URL + endpoint, {
    ...options,
    headers,
  });

  return response.json();
}
