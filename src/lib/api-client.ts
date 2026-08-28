const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";
const standaloneBackend = API_BASE_URL.includes("/api/v1");

export async function submitIssue(input: { file: File; category: "pothole" | "garbage" | "streetlight"; latitude: number; longitude: number; address: string; description?: string }) {
  if (!standaloneBackend) {
    const imageUrl = await fileToDataUrl(input.file);
    return request("/issues", { method: "POST", body: JSON.stringify({ category: input.category, imageUrl, lat: input.latitude, lng: input.longitude, address: input.address, description: input.description }) });
  }
  const upload = new FormData(); upload.append("photo", input.file);
  const uploaded = await request("/uploads", { method: "POST", body: upload });
  return request("/issues", { method: "POST", body: JSON.stringify({ category: input.category.toUpperCase(), imageUrl: uploaded.data.url, latitude: input.latitude, longitude: input.longitude, address: input.address, description: input.description }) });
}
async function request(path: string, init: RequestInit) { const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers: init.body instanceof FormData ? undefined : { "Content-Type": "application/json" } }); const payload = await response.json(); if (!response.ok) throw new Error(payload.error ?? "Request failed"); return payload; }
function fileToDataUrl(file: File) { return new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); }); }
