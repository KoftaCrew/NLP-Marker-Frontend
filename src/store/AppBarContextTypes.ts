export interface AppBarContextType {
  appBarTitle: string;
  setAppBarTitle: (title: string) => void;
  appBarButtons: JSX.Element[];
  setAppBarButtons: (buttons: JSX.Element[]) => void;
}
