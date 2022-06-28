import styles from "./SearchBar.module.scss";
import reactStringReplace from "react-string-replace";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function SearchBar({ className }) {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    performSearch();
  }, [query]);

  async function performSearch() {
    if (!query || query.length < 1) {
      setResults([]);
      return;
    }
    const response = await fetch(
      `/api/search?${new URLSearchParams({ query })}`
    );

    const results = (await response.json()).results;
    setResults([...results.categories, ...results.products]);
  }

  const handleInputChange = (val) => {
    setQuery(val);
  };

  return (
    <div className={`${className} ${styles.searchBar}`}>
      <div className={styles["input-container"]}>
        <i className="material-symbols-outlined">search</i>
        <input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="search products..."
          type="text"
        />
      </div>
      <ul className={styles.results}>
        {results.map((result) => (
          <li key={result._id}>
            <Link href={result.link}>
              <a>
                <div className={styles["result-icon"]}>
                  <Image
                    className={styles.thumbnail}
                    src={result.thumbnailUrl}
                    width={35}
                    height={35}
                  />
                </div>
                <div className={styles["result-text"]}>
                  {reactStringReplace(
                    result.name,
                    new RegExp(`(${query})`, "gi"),
                    (match, i) => {
                      return (
                        <span key={i} className={styles["highlight-text"]}>
                          {match}
                        </span>
                      );
                    }
                  )}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
