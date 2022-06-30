import styles from "./CategoryText.module.scss";
import Fade from "/components/utils/Fade";

export default function CategoryText({show, text, animationTime}) {
  return (
    <Fade
      in={show && text ? true : false}
      duration={animationTime}
    >
      <div className={styles.container}>
        shop{" "}
        <span className={styles["category-name"]}>{text}.</span>
      </div>
    </Fade>
  );
}
