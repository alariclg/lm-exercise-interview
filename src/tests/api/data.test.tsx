import { useDataQuery } from "@api/data";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

global.fetch = vi.fn();

vi.mock("@store/user", () => ({
  default: {
    token: "mock-token-123",
  },
}));

vi.mock("valtio", () => ({
  useSnapshot: vi.fn((state) => state),
}));

describe("useDataQuery", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should fetch data successfully with token", async () => {
    const mockData = [
      {
        id: 1,
        postId: 1,
        name: "Test",
        email: "test@example.com",
        body: "Test body",
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/data",
      expect.objectContaining({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mock-token-123",
        },
      })
    );
  });

  it("should handle fetch errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.message).toBe("Failed to fetch data");
  });
});
