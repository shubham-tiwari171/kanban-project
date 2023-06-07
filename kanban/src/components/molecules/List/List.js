import { MdAdd, MdOutlineClose } from "react-icons/md";
import styles from "./list.module.css";
import Card from "../Card/Card";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const List = () => {
  const [isAddTitle, setIsAddTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [isAddList, setIsAddList] = useState(false);
  const [divisions, setDivisions] = useState([]);

  const innerContentRef = useRef(null);

  useEffect(() => {
    innerContentRef.current.scrollLeft = innerContentRef.current.scrollWidth;
  }, [divisions]);

  useEffect(() => {
    getAllCards();
  }, []);

  const getAllCards = async () => {
    try {
      const response = await axios.get("http://localhost:4000/cards");
      setDivisions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddList = async () => {
    const newCard = {
      id: uuidv4(),
      title: title,
      task: []
    };

    try {
      const response = await axios.post("http://localhost:4000/cards", newCard);
      console.log("Data written to JSON file:", response.data);
    } catch (error) {
      console.error("Error writing to JSON file:", error);
    }

    const updatedDivisions = [...divisions, newCard];
    setDivisions(updatedDivisions);
    setTitle("");
    setIsAddList(true);
  };


  return (
    <div className={styles["inner-content"]} ref={innerContentRef}>
      {divisions.map((division) => (
        <Card key={division.id} title={division.title} data={division} cardId={division.id} />
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
