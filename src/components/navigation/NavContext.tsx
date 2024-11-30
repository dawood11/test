import { createContext } from "react";
import { NavContextType } from "../../types/nav.types";

export const NavContext = createContext<NavContextType | undefined>(undefined);

