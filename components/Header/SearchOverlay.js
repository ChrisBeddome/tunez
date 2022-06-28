import styles from "./SearchOverlay.module.scss";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Fade from "/components/utils/Fade";

export default function SearchOverlay({ enabled }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        <Fade in={enabled} duration={120}>
          <div className={styles.overlay}></div>
        </Fade>,
        document.getElementById("search-overlay")
      )
    : null;
}
