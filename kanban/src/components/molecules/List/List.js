import { MdAdd, MdOutlineClose } from "react-icons/md";
import styles from "./list.module.css";
import Card from "../Card/Card";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const List = () => {
  const [isAddTitle, setIsAddTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [isAddList, setIsAddList] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [isBackgroundClicked, setIsBackgroundClicked] = useState(false);
  const [bgColor, setBgColor] = useState("");

  const divRef1 = useRef(null);

  useEffect(() => {
    setBgColor(localStorage.getItem("bgColor"));
  }, [bgColor]);

  const handleCustomization = () => {
    setIsBackgroundClicked(true);
  };

  const handleClick = (event) => {
    const color = event.target.textContent;
    setBgColor(color);
    localStorage.setItem("bgColor", color);
  };

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
      task: [],
    };

    try {
      const response = await axios.post("http://localhost:4000/cards", newCard);
      console.log("Data written to JSON file:", response.data);
    } catch (error) {
      console.error("Error writing to JSON file:", error);
    }

    const updatedDivisions = [...divisions, newCard];
    if (title !== "") setDivisions(updatedDivisions);
    setTitle("");
    setIsAddList(true);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceCardId = source.droppableId;
    const destinationCardId = destination.droppableId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const updatedDivisions = divisions.map((card) => {
      if (card.id === sourceCardId) {
        const taskList = Array.from(card.task);
        const [movedTask] = taskList.splice(sourceIndex, 1);

        const updatedSourceCard = {
          ...card,
          task: taskList,
        };

        const destinationCard = divisions.find(
          (c) => c.id === destinationCardId
        );

        if (destinationCard) {
          const destinationTaskList = Array.from(destinationCard.task);
          destinationTaskList.splice(destinationIndex, 0, movedTask);

          const updatedDestinationCard = {
            ...destinationCard,
            task: destinationTaskList,
          };

          return updatedDestinationCard;
        }

        return updatedSourceCard;
      }

      return card;
    });

    setDivisions(updatedDivisions);
  };


  return (
    <>
      <div className={styles["inner-content"]} ref={innerContentRef} style={{ background: bgColor }}>
        <div className={styles["add-custom"]} onClick={handleCustomization}>
          background
        </div>
        {isBackgroundClicked && (
          <div className={styles.menu}>
            <input placeholder="enter url" />
            <div className={styles["choose-image"]}></div>
            <div className={styles["choose-color"]}>
              <div ref={divRef1} onClick={handleClick} className={styles.color1}>
                #443C68
              </div>
              <div ref={divRef1} onClick={handleClick} className={styles.color2}>
                #E41655
              </div>
              <div ref={divRef1} onClick={handleClick} className={styles.color3}>
                #A27B5C
              </div>
              <div ref={divRef1} onClick={handleClick} className={styles.color4}>
                #C74B50
              </div>
              <div ref={divRef1} onClick={handleClick} className={styles.color5}>
                #362222
              </div>
              <div ref={divRef1} onClick={handleClick} className={styles.color6}>
                #323232
              </div>
            </div>
          </div>
        )}
        <DragDropContext onDragEnd={handleDragEnd}>
          {divisions.map((division, index) => (
            <Card key={division.id} title={division.title} data={division} cardId={division.id} index={index} />
          ))}
        </DragDropContext>
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
              <button className={styles["add-btn"]} onClick={handleAddList}>
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
        <div onClick={() => setIsAddTitle(true)}>
          <div className={styles["add-list"]}>
            <MdAdd size={25} className={styles["add-icon"]} />
            <span style={{ marginLeft: "2rem" }}>Add another list</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
