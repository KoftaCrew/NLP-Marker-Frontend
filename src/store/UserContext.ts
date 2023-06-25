import { createContext } from "react";
import { UserContextType } from "./UserContextTypes";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { /**/ }
});
