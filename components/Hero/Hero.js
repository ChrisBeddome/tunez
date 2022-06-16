import logo from "/public/branding/logo-white.svg";
import electricGuitar from "/public/icons/electric-guitar.svg";
import bass from "/public/icons/bass-guitar.svg";
import drum from "/public/icons/snare-drum.svg";
import keyboard from "/public/icons/keyboard.svg";
import acousticGuitar from "/public/icons/acoustic-guitar.svg";

import styles from "./Hero.module.scss";

import Image from "next/image";

import { useState } from "react";

export default function Hero() {
  const categories = [
    { name: "electric guitars", img: electricGuitar },
    { name: "bass guitars", img: bass },
    { name: "drums", img: drum },
    { name: "keyboards", img: keyboard },
    { name: "acoustic guitars", img: acousticGuitar },
  ];

  const [focusedCategory, setFocusedCategory] = useState();

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image src={logo} alt="tunez logo" layout="intrinsic" priority />
          </div>
          <nav>
            <ul>
              {categories.map((category) => (
                <li
                  onMouseEnter={() => setFocusedCategory(category)}
                  onMouseLeave={() => setFocusedCategory(null)}
                >
                  <Image
                    src={category.img}
                    height={100}
                    width={100}
                    alt={`shop ${category.name}`}
                    priority
                  />
                </li>
              ))}
            </ul>
            {focusedCategory && (
              <div className={styles["focused-category"]}>
                shop{" "}
                <span className={styles["category-name"]}>
                  {focusedCategory.name}.
                </span>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
