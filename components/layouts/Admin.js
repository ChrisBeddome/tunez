import styles from "./Admin.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <main className={styles["main-content"]}>{children}</main>
    </>
  );
}
