import { fetchWithTimeout, LMS_API } from "./fetch-utils";

export function getAdminEmail(): string {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("admin-email") || "";
  }
  return "";
}

export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  const email = getAdminEmail();
  const headers = new Headers(init?.headers);
  if (email) headers.set("x-admin-email", email);
  return fetchWithTimeout(`${LMS_API}${path}`, { ...init, headers });
}

export async function adminPost(path: string, body: any): Promise<Response> {
  return adminFetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function adminPut(path: string, body: any): Promise<Response> {
  return adminFetch(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function adminDelete(path: string): Promise<Response> {
  return adminFetch(path, { method: "DELETE" });
}

export async function adminUpload(path: string, file: File): Promise<Response> {
  const email = getAdminEmail();
  const fd = new FormData();
  fd.append("file", file);
  const headers: Record<string, string> = {};
  if (email) headers["x-admin-email"] = email;
  return fetchWithTimeout(`${LMS_API}${path}`, { method: "POST", headers, body: fd }, 60000);
}

export { LMS_API };
