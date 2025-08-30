const API_URL = "http://localhost:8070";

function getHeaders(): Record<string, string> {
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (user?.id) headers["X-User-Id"] = String(user.id);

    return headers;
}

async function apiFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...getHeaders(),
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Erro na requisição");
    }

    return response.json() as Promise<T>;
}

export const apiService = {
    get: <T = unknown>(path: string) =>
        apiFetch<T>(path, { method: "GET" }),

    post: <T = unknown>(path: string, body?: unknown) =>
        apiFetch<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),

    put: <T = unknown>(path: string, body?: unknown) =>
        apiFetch<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),

    patch: <T = unknown>(path: string, body?: unknown) =>
        apiFetch<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),

    delete: <T = unknown>(path: string) =>
        apiFetch<T>(path, { method: "DELETE" }),
};