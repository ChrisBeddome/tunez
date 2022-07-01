import styles from "./SearchBar.module.scss";
import SearchResults from "./SearchResults";
import ClickOutside from "/components/utils/ClickOutside";
import { useRouter } from "next/router";

import { useState, useEffect, useRef } from "react";

export default function SearchBar({ className, focused, onFocus, onBlur }) {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const formRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    performSearch();
  }, [query]);

  // need to use custom click-outside handler because blur events fire before click events
  // causing result section to unmount before link click is processed
  ClickOutside(formRef, onBlur);

  async function performSearch() {
    if (!query || query.length < 1) {
      setResults([]);
      return;
    }
    const response = await fetch(
      `/api/simple_search?${new URLSearchParams({ query })}`
    );

    const results = (await response.json()).results;
    setResults([...results.products, ...results.categories, ...results.brands]);
  }

  const handleInputChange = (val) => {
    setQuery(val);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    inputRef.current.blur();
    router.push(`/shop/search?term=${query}`);
    onBlur();
  };

  return (
    <div
      className={`${className} ${styles.searchBar} ${
        focused ? styles.focused : null
      }`}
    >
      <form
        className={styles["input-container"]}
        ref={formRef}
        onSubmit={submitSearch}
      >
        <i className="material-symbols-outlined">search</i>
        <input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="search products..."
          type="text"
          onFocus={onFocus}
          ref={inputRef}
        />
      </form>
      {focused && <SearchResults items={results} queriedText={query} />}
    </div>
  );
}
