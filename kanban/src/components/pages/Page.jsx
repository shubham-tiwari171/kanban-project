import styles from "./Page.module.css";
import { useState, useRef, useEffect } from "react";
import List from "../molecules/List/List";
const Page = () => {
  return (
    <>
      <div className={styles.header}>
        <div style={{ width: "98%", backgroundColor: "azure" }}>Header</div>
      </div>
      <List />
    </>
  );
};

export default Page;
