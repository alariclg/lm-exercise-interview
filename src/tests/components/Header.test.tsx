import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import Header from "@components/Header";

describe("Header Component", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );

  it("should render with custom page title", () => {
    render(<Header pageTitle="Test Page" />, { wrapper });

    expect(screen.getByText("Test Page")).toBeInTheDocument();
  });

  it("should render without page title", () => {
    const { container } = render(<Header />, { wrapper });

    const toolbar = container.querySelector("ion-toolbar");

    expect(toolbar).toBeInTheDocument();
  });

  it("should render profile button with icon", () => {
    const { container } = render(<Header pageTitle="Home" />, { wrapper });

    const profileButton = container.querySelector("ion-button");

    expect(profileButton).toHaveAttribute("href", "/profil");
  });
});
