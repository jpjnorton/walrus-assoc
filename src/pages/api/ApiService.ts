export default class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed: ${response.status}`);
    }

    return response.json();
  }

  async post<TResponse, TRequest = unknown>(endpoint: string, body: TRequest): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`POST ${endpoint} failed: ${response.status} - ${errorBody}`);
    }

    return response.json();
  }
}
