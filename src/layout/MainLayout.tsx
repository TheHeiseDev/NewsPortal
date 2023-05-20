import { FC } from "react";

import { JsxElement } from "typescript";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = ({ children }: JsxElement) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
