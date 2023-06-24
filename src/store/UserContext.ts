import { createContext } from "react";
import { UserContextType } from "../entities/UserContext";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {/**/}
});
