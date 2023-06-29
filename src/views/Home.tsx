import { useEffect, useState, useCallback } from "react";
import { User } from "../entities/User";
import { UserContext } from "../store/UserContext";
import When from "../components/When";
import Login from "./Login";
import Dashboard from "./Dashboard";
import axiosInstance, { setAuthorizationHeader } from "../services/AxiosService";

const Home = () => {
  const [user, setInternalUser] = useState<User | null | undefined>(undefined);

  const setUser = useCallback((user: User | null) => {
    setInternalUser(user);
  }, []);

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const checkUser = async () => {
        try {
          await axiosInstance.get(
            '/auth/profile/',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          );

          const user = localStorage.getItem('user');
          if (user) {
            setAuthorizationHeader(accessToken);
            setUser(JSON.parse(user));
          }
          else {
            setUser(null);
          }
        }
        catch (error) {
          setUser(null);
        }
      };

      checkUser();
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
