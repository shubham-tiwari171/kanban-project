import React, { useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { MdAdd, MdOutlineClose } from "react-icons/md";
import styles from "./card.module.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Card = ({ title }) => {
  const [isAddTitle, setIsAddTitle] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [isAddList, setIsAddList] = useState(false);
  return (
    <div className={styles["add-Card"]}>
      <div className={styles["title-more-icon"]}>
        <span className={styles.title}>{title}</span>
        <span>
          <MdMoreHoriz className={styles["more-icon"]} />
        </span>
      </div>
      <div onClick={() => setIsAddTitle(!isAddTitle)}>
        <div className={styles["add-list"]}>
          <MdAdd className={styles["add-icon"]} size={25} /> <span className={styles["add-text"]}>Add a card</span>
        </div>
      </div>
      {isAddTitle ? (
        <div className={styles["add-title"]}>
          <div>
            <FloatingLabel controlId="floatingTextarea2" >
              <Form.Control
                as="textarea"
                placeholder="Enter a title for this card..."
                style={{ MinHeight: '300px', overflow: 'hidden' }}
                className={styles["add-input"]}
                value={addTitle}

                onChange={(e) => setAddTitle(e.target.value)}
              />
            </FloatingLabel>
            {/* <input
              placeholder="Enter a title for this card... "
              
            /> */}
          </div>
          <div>
            <button
              className={styles["add-btn"]}
              onClick={() => setIsAddList(!isAddList)}
            >
              Add Card
            </button>
            <span onClick={() => setIsAddTitle(!isAddTitle)}>
              <MdOutlineClose size={25} className={styles["close-btn"]} />
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
