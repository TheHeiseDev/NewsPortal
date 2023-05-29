import styles from "./MainLayout.module.scss"
import { FC, ReactNode } from "react";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

interface IMainLayout {
  children: ReactNode
}

export const MainLayout: FC<IMainLayout> = ({ children }) => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
