import { useLoginMutation } from "@api/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

global.fetch = vi.fn();

describe("useLoginMutation", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should login successfully with valid credentials", async () => {
    const mockResponse = {
      user: "testuser",
      token: "mock-jwt-token-123",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useLoginMutation(), { wrapper });

    result.current.mutate({
      username: "testuser",
      password: "password",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/auth",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "testuser",
          password: "password",
        }),
      })
    );
  });

  it("should handle login errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    const { result } = renderHook(() => useLoginMutation(), { wrapper });

    result.current.mutate({
      username: "wronguser",
      password: "wrongpassword",
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.message).toBe("Login failed");
  });

  it("should send correct request body", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: "testuser", token: "token" }),
    });

    const { result } = renderHook(() => useLoginMutation(), { wrapper });

    const credentials = {
      username: "testuser",
      password: "mypassword",
    };

    result.current.mutate(credentials);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/auth",
        expect.objectContaining({
          body: JSON.stringify({
            user: credentials.username,
            password: credentials.password,
          }),
        })
      );
    });
  });
});
