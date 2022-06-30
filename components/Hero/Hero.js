import styles from "./Hero.module.scss";
import { useState, useEffect } from "react";

import Categories from "./Categories";
import CategoryText from "./CategoryText";

const transitionDelay = 40; //ms

export default function Hero({ categories }) {
  const frames = [null, null, ...categories, null];

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
    }, 1000);
    return ref;
  };

  return (
    <div className={styles.hero}>
      <nav className={styles.container}>
        <Categories
          categories={categories}
          focusedCategory={focusedCategory}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <CategoryText
          show={focusedCategory}
          text={focusedCategoryText}
          animationTime={transitionDelay}
        />
      </nav>
    </div>
  );
}
