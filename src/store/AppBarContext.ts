import { createContext } from "react";
import { AppBarContextType } from "./AppBarContextTypes";

export const AppBarContext = createContext<AppBarContextType>({
  appBarTitle: "",
  setAppBarTitle: () => { /**/ },
  appBarButtons: [],
  setAppBarButtons: () => { /**/ }
});
