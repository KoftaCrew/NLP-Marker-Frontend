import { useState } from "react";
import { User } from "../entities/User";
import { UserContext } from "../store/UserContext";
import When from "../components/When";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
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
