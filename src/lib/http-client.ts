import Cookies from "js-cookie";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export type ResponseData<T = any> = {
  message: string;
  data: T | any;
  code: number;
};

class HttpClient {
  private baseUrl: string;
  private isServer: boolean;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.isServer = typeof window === "undefined";
  }

  private getToken(): string | undefined {
    if (this.isServer) {
      // Server-side: token should be passed in through the request object
      // This will be handled in the request method
      return undefined;
    } else {
      // Client-side: get token from cookie or localStorage
      return Cookies.get("token") || localStorage.getItem("token") || undefined;
    }
  }

  private async request<T>(
    endpoint: string,
    method: RequestMethod = "GET",
    options: FetchOptions = {},
    req?: any // for server-side requests
  ): Promise<T> {
    const { headers = {}, params = {}, body, ...restOptions } = options;

    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    let token;
    if (this.isServer && req) {
      // Server-side: get token from cookie in the request object
      token = req.cookies.token;
    } else {
      // Client-side: get token using the getToken method
      token = this.getToken();
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...restOptions,
    });

    const data = await response.json();

    if (!response.ok) {
      // This will handle all non-2xx status codes
      const error = new Error(
        data.message || `HTTP error! status: ${response.status}`
      );
      (error as any).response = response;
      (error as any).data = data;
      throw error;
    }

    return data as T;
  }

  public get<T>(
    endpoint: string,
    options?: FetchOptions,
    req?: any
  ): Promise<T> {
    return this.request<T>(endpoint, "GET", options, req);
  }

  public post<T>(
    endpoint: string,
    body: any,
    options?: FetchOptions,
    req?: any
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", { ...options, body }, req);
  }

  public put<T>(
    endpoint: string,
    body: any,
    options?: FetchOptions,
    req?: any
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", { ...options, body }, req);
  }

  public delete<T>(
    endpoint: string,
    options?: FetchOptions,
    req?: any
  ): Promise<T> {
    return this.request<T>(endpoint, "DELETE", options, req);
  }

  public patch<T>(
    endpoint: string,
    body: any,
    options?: FetchOptions,
    req?: any
  ): Promise<T> {
    return this.request<T>(endpoint, "PATCH", { ...options, body }, req);
  }
}

// Create and export an instance
const httpClient = new HttpClient(process.env.NEXT_PUBLIC_API_URL || "");

export default httpClient;
