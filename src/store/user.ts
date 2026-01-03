import User from "@models/User";
import { proxy } from "valtio";

interface UserState extends User {
  isLoggedIn: boolean;
  token?: string;
}

const userState = proxy<UserState>({
  isLoggedIn: false,
  username: null,
  token: undefined,
});

export const login = (username: string, token: string) => {
  userState.isLoggedIn = true;
  userState.username = username;
  userState.token = token;
};

export const logout = () => {
  userState.isLoggedIn = false;
  userState.username = null;
  userState.token = undefined;
};

export default userState;
