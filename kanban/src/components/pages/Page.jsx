import styles from "./Page.module.css";
import { useState, useRef, useEffect } from "react";

const Page = () => {
  const [divisions, setDivisions] = useState([]);
  const innerContentRef = useRef(null);

  useEffect(() => {
    console.log(innerContentRef.current.scrollWidth);
    console.log(innerContentRef.current.scrollLeft);
    innerContentRef.current.scrollLeft = innerContentRef.current.scrollWidth;
  }, [divisions]);

  const handleAddNewDiv = () => {
    const newDiv = <div className={styles.box}></div>;
    setDivisions([...divisions, newDiv]);
  };

  return (
    <>
      <div className={styles.header}>
        <div style={{ width: "98%", backgroundColor: "azure" }}>Header</div>
      </div>
      <div className={styles.content}>
        <div>
          <button className="btn btn-primary" onClick={handleAddNewDiv}>
            Add another div
          </button>
        </div>
        <div className={styles["inner-content"]} ref={innerContentRef}>
          {divisions.map((division, index) => (
            <div key={index} className={styles.box}>
              {index}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
