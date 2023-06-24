import { useState } from "react";
import { User } from "../entities/User";
import { UserContext } from "../store/UserContext";
import When from "../components/When";
import Login from "../components/Login";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <When isTrue={user === null}>
        <Login />
      </When>
    </UserContext.Provider>
  );
};

export default Home;
