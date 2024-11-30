import { useState } from "react";
import { NavContext } from "./NavContext";
import { NavLinkType, NavProviderProps } from "../../types/nav.types";
import { Footer } from "./Footer";

export const NavProvider = ({ children }: NavProviderProps): JSX.Element => {
  const [navLinks, setNavLinks] = useState<NavLinkType[]>([
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Speakers", href: "/speakers" },
    { name: "Talks", href: "/talks" },
    { name: "Contact", href: "/contact" },
  ]);

  return (
    <NavContext.Provider value={{ navLinks, setNavLinks }}>
      {children}
      <Footer />
    </NavContext.Provider>
  );
};
