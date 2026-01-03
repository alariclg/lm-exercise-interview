import { useMutation } from "@tanstack/react-query";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  user: string;
  token: string;
}

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await fetch(`/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: credentials.username,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    },
  });
};
