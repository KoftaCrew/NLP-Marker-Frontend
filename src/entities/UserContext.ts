import { User } from "./User";

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
