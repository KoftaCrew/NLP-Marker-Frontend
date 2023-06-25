import { User } from "../entities/User";

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
