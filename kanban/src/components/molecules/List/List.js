import React, { useState } from "react";
import { MdAdd, MdOutlineClose } from "react-icons/md";
import styles from "./list.module.css";
import Card from "../Card/Card";

const List = () => {
  const [isAddTitle, setIsAddTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [isAddList, setIsAddList] = useState(false);

  const handleAddList = () => {
    if (title !== "" && title.length > 2)
      setIsAddList(!isAddList);
  };

  return (
    <div className={styles.container}>
      <div onClick={() => setIsAddTitle(!isAddTitle)}>
        <div className={styles["add-list"]}>
          <MdAdd className={styles["add-icon"]} /> Add another list
        </div>
      </div>
      {isAddTitle ? (
        <div className={styles["add-title"]}>
          <div>
            {" "}
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
      {isAddList ? (
        <div className="d-flex justify-content-center">
          <Card title={title} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default List;
