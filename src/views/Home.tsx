import { useEffect, useState } from "react";
import { User } from "../entities/User";
import { UserContext } from "../store/UserContext";
import When from "../components/When";
import Login from "./Login";
import Dashboard from "./Dashboard";

const Home = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

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
  }, []);

  return (
    <UserContext.Provider value={{ user: user ? user : null, setUser }}>
      <When isTrue={user === null}>
        <Login />
      </When>
      <When isTrue={user !== null}>
        <Dashboard />
      </When>
    </UserContext.Provider>
  );
};

export default Home;
