type ApiFetchInit = Omit<RequestInit, "body"> & {
  body?: Record<any, any>;
  params?: Record<string, string | number | null | undefined>;
};

type ApiErrorResponse = {
  message: string;
  code: number;
};

class ApiError extends Error {
  code = 500;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

const jsonIsApiError = (
  json: Record<string, any>
): json is ApiErrorResponse => {
  return typeof json.code === "number" && typeof json.message === "string";
};

export const fetchApi = async <T = any>(
  endpoint: string,
  init?: ApiFetchInit
) => {
  const { body, headers, params, ...restInit } = init ?? {};
  const hasBody = typeof body === "object";
  let _params = "";

  // NOTE: filter empty values
  if (params && Object.entries(params).length) {
    const clearedParams = Object.fromEntries(
      Object.entries(params).filter((param) => !!param[1])
    );
    if (Object.entries(clearedParams).length > 0) {
      _params =
        "?" + new URLSearchParams(params as Record<string, string>).toString();
    }
  }

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api${endpoint}${_params}`;

  const result = await fetch(url, {
    method: body ? "POST" : "GET",
    body: hasBody ? JSON.stringify(body) : undefined,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...restInit,
  });

  const json = await result.json();

  if (result.ok) {
    return json as T;
  }

  if (jsonIsApiError(json)) {
    throw new ApiError(json.message, json.code);
  }

  throw new ApiError("Something went wrong", 500);
};
