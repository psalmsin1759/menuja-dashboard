import { AxiosError } from "axios";

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    throw {
      status,
      message,
      details: error.response?.data || null,
    };
  }

  throw {
    status: null,
    message: (error as Error)?.message || "An unknown error occurred",
    details: null,
  };
}
