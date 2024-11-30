import { useContext } from "react";
import { NavContext } from "../components/navigation/NavContext";
import { NavContextType } from "../../src/types/nav.types";

export const useNavContext = (): NavContextType => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("NavContext Error");
  }
  return context;
};