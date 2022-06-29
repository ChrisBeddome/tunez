import styles from "./SearchResults.module.scss";
import Image from "next/image";
import Link from "next/link";
import reactStringReplace from "react-string-replace";

export default function SearchResults({ items, queriedText }) {
  return (
    <ul className={styles.results}>
      {items.map((item) => (
        <li key={item._id}>
          <Link href={item.link} prefetch={false}>
            <a>
              <span className={styles["result-icon"]}>
                <Image
                  className={styles.thumbnail}
                  src={item.thumbnailUrl}
                  width={35}
                  height={35}
                />
              </span>
              <span className={styles["result-text"]}>
                {reactStringReplace(
                  item.name,
                  new RegExp(`(${queriedText})`, "gi"),
                  (match, i) => {
                    return (
                      <span key={i} className={styles["highlight-text"]}>
                        {match}
                      </span>
                    );
                  }
                )}
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
