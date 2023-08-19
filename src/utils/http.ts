interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

class ApiError {
  constructor(
    public message: string,
    public status: number,
    public response: unknown
  ) {}

  toString(): string {
    return `${this.message}\nResponse:\n${JSON.stringify(
      this.response,
      null,
      2
    )}`;
  }
}

async function http<T>(
  apiUrl: string,
  userOptions: RequestInit = {}
): Promise<ApiResponse<T>> {
  const defaultOptions: RequestInit = {};
  const defaultHeaders: HeadersInit = {};

  const options: RequestInit = {
    ...defaultOptions,
    ...userOptions,
    headers: {
      ...defaultHeaders,
      ...userOptions.headers,
    },
  };

  const url = `${apiUrl}`;

  if (
    options.body &&
    typeof options.body === "object" &&
    !(options.body instanceof File)
  ) {
    options.body = JSON.stringify(options.body);
  }

  let response: Response | null = null;

  try {
    response = await fetch(url, options);

    if (!response.ok && (response.status < 200 || response.status >= 300)) {
      if (response.status === 401) {
        // Handle unauthorized requests
      }

      const errorText = await response.text();
      throw new ApiError(
        `Request failed with status ${response.status}.`,
        response.status,
        errorText
      );
    }

    const data = (await response.json()) as T;
    return { data, error: null };
  } catch (error) {
    if (response) {
      throw new ApiError(
        `Request failed with status ${response.status}.`,
        response.status,
        error
      );
    } else {
      const errorMessage =
        error instanceof Error ? error.toString() : "An unknown error occurred";
      throw new ApiError(errorMessage, 0, "REQUEST_FAILED");
    }
  }
}

export default http;
