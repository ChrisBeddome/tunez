import styles from "./Header.module.scss";
import SearchBar from "/components/SearchBar/SearchBar";
import SearchOverlay from "./SearchOverlay";

import logo from "/public/branding/logo-white.svg";
import Image from "next/image";

import { useState } from "react";

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };
  const handleSearchBlur = () => {
    setSearchFocused(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={logo} alt="tunez logo" width={140} priority />
      </div>
      <SearchBar
        className={styles["search-bar"]}
        focused={searchFocused}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
      />
      <div className={styles.navigation}>
        <i className="material-symbols-outlined">person</i>
        <i className="material-symbols-outlined">shopping_cart</i>
      </div>
      <SearchOverlay enabled={searchFocused} />
    </header>
  );
}
