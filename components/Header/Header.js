import styles from "./Header.module.scss";
import logo from "/public/branding/logo-white.svg";
import SearchBar from "/components/SearchBar/SearchBar";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={logo} alt="tunez logo" width={140} priority />
      </div>
      <SearchBar className={styles["search-bar"]} />
      <div className={styles.navigation}>
        <i className="material-symbols-outlined">person</i>
        <i className="material-symbols-outlined">shopping_cart</i>
      </div>
    </header>
  );
}
