// src/components/PrivateRoute.tsx
import { Route, Redirect } from "react-router-dom";
import { useSnapshot } from "valtio";

import userState from "@store/user";


interface PrivateRouteProps {
  children: React.ReactNode;
  exact?: boolean;
  path: string;
}

export const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const { isLoggedIn } = useSnapshot(userState);

  return (
    <Route
      {...rest}
      render={() => (isLoggedIn ? children : <Redirect to="/login" />)}
    />
  );
};
