import { createContext } from "react";
type LoginContextType = {
  user: string | null;
  login: () => void;
  logout: () => void;
};
export const LoginContext = createContext<LoginContextType | null>(null);
