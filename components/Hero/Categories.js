import Image from "next/image";
import Link from "next/link";
import styles from "./Categories.module.scss";

export default function Categories({
  categories,
  focusedCategory,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <ul className={styles["category-list"]}>
      {categories.map((category) => (
        <li
          key={category.name}
          className={focusedCategory === category ? styles.focused : null}
          onMouseEnter={() => onMouseEnter(category)}
          onMouseLeave={onMouseLeave}
        >
          <Link href={`/shop/categories/${category.slug}`}>
            <a>
              <Image
                src={category.iconUrl}
                height={100}
                width={100}
                alt={`shop ${category.name}`}
                priority
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
