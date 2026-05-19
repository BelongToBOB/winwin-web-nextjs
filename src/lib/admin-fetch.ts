import { fetchWithTimeout, LMS_API } from "./fetch-utils";

let cachedToken: string | null = null;

async function getAuthToken(): Promise<string> {
  // Fetch JWT from next-auth session cookie endpoint
  if (cachedToken) return cachedToken;
  try {
    const res = await fetch("/api/auth/session");
    const session = await res.json();
    if (session?.user?.email) {
      // Get the raw session token from cookie
      const cookies = document.cookie.split(";").map(c => c.trim());
      const tokenCookie = cookies.find(c =>
        c.startsWith("authjs.session-token=") ||
        c.startsWith("__Secure-authjs.session-token=") ||
        c.startsWith("next-auth.session-token=") ||
        c.startsWith("__Secure-next-auth.session-token=")
      );
      if (tokenCookie) {
        cachedToken = tokenCookie.split("=").slice(1).join("=");
        return cachedToken;
      }
    }
  } catch {}
  return "";
}

function getAdminEmail(): string {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("admin-email") || "";
  }
  return "";
}

export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = await getAuthToken();
  const email = getAdminEmail();
  const headers = new Headers(init?.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  // Fallback: send email header too (backward compat during transition)
  if (email) {
    headers.set("x-admin-email", email);
  }

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
  const token = await getAuthToken();
  const email = getAdminEmail();
  const fd = new FormData();
  fd.append("file", file);
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (email) headers["x-admin-email"] = email;
  return fetchWithTimeout(`${LMS_API}${path}`, { method: "POST", headers, body: fd }, 60000);
}

// Clear token cache on logout
export function clearAdminToken() {
  cachedToken = null;
}

export { LMS_API };
