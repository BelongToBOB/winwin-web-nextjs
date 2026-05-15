import { fetchWithTimeout, LMS_API } from "./fetch-utils";

export { LMS_API };

export function getUserEmail(): string {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("learn-email") || "";
  }
  return "";
}

export async function learnFetch(path: string, init?: RequestInit): Promise<Response> {
  const email = getUserEmail();
  const headers = new Headers(init?.headers);
  if (email) headers.set("x-user-email", email);

  return fetchWithTimeout(`${LMS_API}${path}`, { ...init, headers });
}

export async function learnPost(path: string, body: any): Promise<Response> {
  const email = getUserEmail();
  return fetchWithTimeout(`${LMS_API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-user-email": email },
    body: JSON.stringify(body),
  });
}

export async function learnPut(path: string, body: any): Promise<Response> {
  const email = getUserEmail();
  return fetchWithTimeout(`${LMS_API}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-user-email": email },
    body: JSON.stringify(body),
  });
}

export async function learnDelete(path: string): Promise<Response> {
  const email = getUserEmail();
  return fetchWithTimeout(`${LMS_API}${path}`, {
    method: "DELETE",
    headers: { "x-user-email": email },
  });
}
