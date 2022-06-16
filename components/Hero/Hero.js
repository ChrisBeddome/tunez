import logo from "/public/branding/logo-white.svg";
import electricGuitar from "/public/icons/electric-guitar.svg";
import bass from "/public/icons/bass-guitar.svg";
import drum from "/public/icons/snare-drum.svg";
import keyboard from "/public/icons/keyboard.svg";
import acousticGuitar from "/public/icons/acoustic-guitar.svg";

import styles from "./Hero.module.scss";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Fade from "/components/utils/Fade";

const animationDuration = 200;

const categories = [
  { name: "electric guitars", img: electricGuitar },
  { name: "bass guitars", img: bass },
  { name: "drums", img: drum },
  { name: "keyboards", img: keyboard },
  { name: "acoustic guitars", img: acousticGuitar },
];

export default function Hero() {
  const [focusedCategory, setFocusedCategory] = useState();
  const [hovering, setHovering] = useState(false);
  const [storedTimeout, setStoredTimeout] = useState(null);

  const handleMouseEnter = (category) => {
    storedTimeout && clearTimeout(storedTimeout);
    setHovering(true);
    setFocusedCategory(category);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setStoredTimeout(
      setTimeout(() => {
        setFocusedCategory(null);
      }, animationDuration)
    );
  };

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
                <Link href={`/shop/categories/${category.name}`} key={category.name}>
                  <a>
                    <li
                      onMouseEnter={() => handleMouseEnter(category)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        src={category.img}
                        height={100}
                        width={100}
                        alt={`shop ${category.name}`}
                        priority
                      />
                    </li>
                  </a>
                </Link>
              ))}
            </ul>
            <Fade in={hovering} duration={animationDuration}>
              <div className={styles["focused-category"]}>
                shop{" "}
                <span className={styles["category-name"]}>
                  {focusedCategory && focusedCategory.name}.
                </span>
              </div>
            </Fade>
          </nav>
        </div>
      </div>
    </>
  );
}
