import { useEffect, useState, useCallback } from "react";
import { User } from "../entities/User";
import { UserContext } from "../store/UserContext";
import When from "../components/When";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { setAuthorizationHeader } from "../services/AxiosService";

const Home = () => {
  const [user, setInternalUser] = useState<User | null | undefined>(undefined);

  const setUser = useCallback((user: User | null) => {
    setAuthorizationHeader(user?.accessToken ?? '');
    setInternalUser(user);
  }, []);

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
    else {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user: user ? user : null, setUser }}>
      <When isTrue={user === null}>
        <Login />
      </When>
      <When isTrue={user !== null && user !== undefined}>
        <Dashboard />
      </When>
    </UserContext.Provider>
  );
};

export default Home;
