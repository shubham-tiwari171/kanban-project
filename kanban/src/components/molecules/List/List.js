import { MdAdd, MdOutlineClose } from "react-icons/md";
import styles from "./list.module.css";
import Card from "../Card/Card";
import { useState, useRef, useEffect } from "react";

const List = () => {
  const [isAddTitle, setIsAddTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [isAddList, setIsAddList] = useState(false);
  const [divisions, setDivisions] = useState([]);


  const innerContentRef = useRef(null);

  useEffect(() => {
    console.log(innerContentRef.current.scrollWidth);
    console.log(innerContentRef.current.scrollLeft);
    innerContentRef.current.scrollLeft = innerContentRef.current.scrollWidth;
  }, [divisions]);

  const handleAddList = () => {
    setDivisions([...divisions, { title: title }]);
    setTitle("");
    setIsAddList(true);
  };

  return (
    <div className={styles["inner-content"]} ref={innerContentRef}>

      {isAddList &&
        divisions.map((division, index) => (
          <Card key={index} title={division.title} />
        ))}

      {isAddTitle ? (
        <div className={styles["add-title"]}>
          <div>
            <input
              placeholder="Enter list title..."
              value={title}
              className={styles["add-input"]}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <button
              className={styles["add-btn"]}
              onClick={() => handleAddList()}
            >
              Add List
            </button>{" "}
            <span onClick={() => setIsAddTitle(!isAddTitle)}>
              <MdOutlineClose size={25} className={styles["close-btn"]} />
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div onClick={() => setIsAddTitle(!isAddTitle)}>
        <div className={styles["add-list"]}>
          <MdAdd className={styles["add-icon"]} /> Add another list
        </div>
      </div>
    </div>
  );
};

export default List;
