"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  //  Homepage paths logic lock to allow top image expansion
  if (pathname === "/" || pathname === "" || pathname === "/index") {
    return null;
  }

  return <Header />;
}