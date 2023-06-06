import styles from "./Page.module.css";
import { useState, useRef, useEffect } from "react";
import List from "../molecules/List/List";
const Page = () => {
  const [divisions, setDivisions] = useState([]);
  const innerContentRef = useRef(null);

  // useEffect(() => {
  //   console.log(innerContentRef.current.scrollWidth);
  //   console.log(innerContentRef.current.scrollLeft);
  //   innerContentRef.current.scrollLeft = innerContentRef.current.scrollWidth;
  // }, [divisions]);

  // const handleAddNewDiv = () => {
  //   const newDiv = <List />;
  //   setDivisions([...divisions, newDiv]);
  // };

  return (
    <>
      <div className={styles.header}>
        <div style={{ width: "98%", backgroundColor: "azure" }}>Header</div>
      </div>
      <List />
      {/* <div className={styles.content}>
        <div className={styles["inner-content"]} ref={innerContentRef}>
         
         
        </div>
      </div> */}
    </>
  );
};

export default Page;
