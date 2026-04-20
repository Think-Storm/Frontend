type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    headers?: Record<string, string>;
    signal?: AbortSignal;
};

type FetchError = {
    message: string;
    status: number;
};

export async function fetcher<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {}, signal } = options;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

    const apiUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

    const response = await fetch(apiUrl, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal,
    });

    const data = await response.json();

    if (!response.ok) {
        const error: FetchError = {
            message: data.message || "Something went wrong",
            status: response.status,
        };
        throw error;
    }

    return data;
}

export const api = {
    get: <T>(url: string, options?: Omit<FetchOptions, "method" | "body">) =>
        fetcher<T>(url, { ...options, method: "GET" }),

    post: <T>(url: string, data: unknown, options?: Omit<FetchOptions, "method">) =>
        fetcher<T>(url, { ...options, method: "POST", body: data }),

    put: <T>(url: string, data: unknown, options?: Omit<FetchOptions, "method">) =>
        fetcher<T>(url, { ...options, method: "PUT", body: data }),

    patch: <T>(url: string, data: unknown, options?: Omit<FetchOptions, "method">) =>
        fetcher<T>(url, { ...options, method: "PATCH", body: data }),

    delete: <T>(url: string, options?: Omit<FetchOptions, "method" | "body">) =>
        fetcher<T>(url, { ...options, method: "DELETE" }),
};
