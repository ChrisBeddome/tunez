import styles from "./SearchBar.module.scss";
import SearchResults from "./SearchResults";
import ClickOutside from "/components/utils/ClickOutside";

import { useState, useEffect, useRef } from "react";

export default function SearchBar({ className, focused, onFocus, onBlur }) {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    performSearch();
  }, [query]);

  // need to use custom click-outside handler because blur events fire before click events
  // causing result section to unmount before link click is processed
  ClickOutside(inputRef, onBlur);

  async function performSearch() {
    if (!query || query.length < 1) {
      setResults([]);
      return;
    }
    const response = await fetch(
      `/api/search?${new URLSearchParams({ query })}`
    );

    const results = (await response.json()).results;
    setResults([...results.products, ...results.categories]);
  }

  const handleInputChange = (val) => {
    setQuery(val);
  };

  return (
    <div
      className={`${className} ${styles.searchBar} ${
        focused ? styles.focused : null
      }`}
    >
      <div className={styles["input-container"]}>
        <i className="material-symbols-outlined">search</i>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="search products..."
          type="text"
          onFocus={onFocus}
        />
      </div>
      {focused && <SearchResults items={results} queriedText={query} />}
    </div>
  );
}
