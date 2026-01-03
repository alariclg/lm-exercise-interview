import { Home } from "@pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
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

describe("Home Page", () => {
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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BrowserRouter>
  );

  it("should render page title", () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<Home />, { wrapper });

    expect(screen.getByText("Fetched data example")).toBeInTheDocument();
  });

  it("should display loading state", () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { container } = render(<Home />, { wrapper });

    expect(container.querySelector("ion-loading")).toBeInTheDocument();
  });

  it("should display data after successful fetch", async () => {
    const mockData = [
      {
        id: 1,
        postId: 1,
        name: "Test Name",
        email: "test@example.com",
        body: "Test body content",
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Home />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("Test Name")).toBeInTheDocument();
    });

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("should display error message when fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<Home />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("Error fetching data")).toBeInTheDocument();
    });
  });
});
