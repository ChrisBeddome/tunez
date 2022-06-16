import logo from "/public/branding/logo-white.svg";
import electricGuitar from "/public/icons/electric-guitar.svg";
import bass from "/public/icons/bass-guitar.svg";
import drum from "/public/icons/snare-drum.svg";
import keyboard from "/public/icons/keyboard.svg";
import acousticGuitar from "/public/icons/acoustic-guitar.svg";

import styles from "./Hero.module.scss";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import Fade from "/components/utils/Fade";

const categories = [
  { name: "electric guitars", img: electricGuitar },
  { name: "bass guitars", img: bass },
  { name: "drums", img: drum },
  { name: "keyboards", img: keyboard },
  { name: "acoustic guitars", img: acousticGuitar },
];

const frames = [null, null, ...categories, null];
const transitionDelay = 40; //ms

export default function Hero() {
  const [focusedCategoryText, setFocusedCategoryText] = useState(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const focusedCategory = hoveredCategory || frames[currentFrameIndex];

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setCurrentFrameIndex(0);
  };

  useEffect(() => {
    const ref = setFrameInterval();
    return () => {
      clearInterval(ref);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFocusedCategoryText(focusedCategory && focusedCategory.name);
    }, transitionDelay);
  }, [focusedCategory]);

  const setFrameInterval = () => {
    const ref = setInterval(() => {
      setCurrentFrameIndex((prevFrameIndex) => {
        return prevFrameIndex < frames.length - 1 ? prevFrameIndex + 1 : 0;
      });
    }, 1200);
    return ref;
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
                <li
                  className={
                    focusedCategory === category ? styles.focused : null
                  }
                  onMouseEnter={() => handleMouseEnter(category)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={`/shop/categories/${category.name.replaceAll(
                      " ",
                      "-"
                    )}`}
                    key={category.name}
                  >
                    <a>
                      <Image
                        src={category.img}
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
            <Fade
              in={focusedCategory && focusedCategoryText ? true : false}
              duration={transitionDelay}
            >
              <div className={styles["focused-category"]}>
                shop{" "}
                <span className={styles["category-name"]}>
                  {focusedCategoryText}.
                </span>
              </div>
            </Fade>
          </nav>
        </div>
      </div>
    </>
  );
}
