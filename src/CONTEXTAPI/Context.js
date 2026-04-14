import { createContext, useContext } from "react";

export const DashboardContext = createContext();

export function useUserContext() {
  const user = useContext(DashboardContext);
  if (user === undefined) {
    throw new Error("User does not exist");
  }
  return user;
}
