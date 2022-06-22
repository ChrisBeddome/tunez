import styles from "./Header.module.scss";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <ul>
        <li>
          <button>
            <Image
              src={`/icons/search__white.svg`}
              height={26}
              width={26}
              alt="search"
              priority
            />
          </button>
        </li>
        <li>
          <button>
            <Image
              src={`/icons/shopping-cart__white.svg`}
              height={26}
              width={26}
              alt="shopping cart"
              priority
            />
          </button>
        </li>
      </ul>
    </header>
  );
}
