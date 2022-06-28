import styles from "./Primary.module.scss";
import Header from "/components/Header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles["main-content"]}>{children}</main>
    </>
  );
}
