import React from "react";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.loader}></div>
        <div className={`${styles.loaderText}`}>Loading...</div>
      </div>
    </>
  );
}

export default Loader;
