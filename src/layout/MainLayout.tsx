import { FC } from "react";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { JsxElement } from "typescript";

export const MainLayout = ({ children }: JsxElement) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
