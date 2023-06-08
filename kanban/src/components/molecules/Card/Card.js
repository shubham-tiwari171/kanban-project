import { MdMoreHoriz, MdAdd, MdClose } from "react-icons/md";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { MdModeEdit } from "react-icons/md";
import styles from "./card.module.css";
import Templatelogo from '../../images/Templatelogo.svg'


const Card = ({ title, cardId }) => {
  const [isAddTitle, setIsAddTitle] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/cards");
        const tasksData = response.data;
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks data:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (addTitle.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        taskName: addTitle,
        taskDescription: 'jhhjgjhgjgghjgjhhg',
      };
      const updatedTasks = tasks.map((task) => {
        if (task.id === cardId) {
          return {
            ...task,
            task: [...task.task, newTask],
          };
        }
        return task;
      });
      try {
        // Find the index of the task object that has changed
        const changedTaskIndex = updatedTasks.findIndex((task) => task.id === cardId);

        // Make a PUT request to update the specific task object on the server
        await axios.put(`http://localhost:4000/cards/${cardId}`, updatedTasks[changedTaskIndex]);

        // Update only the changed task object in the state
        setTasks((prevState) => {
          const updatedState = [...prevState];
          updatedState[changedTaskIndex] = updatedTasks[changedTaskIndex];
          return updatedState;
        });
        console.log(tasks)
        setAddTitle("");
        setIsAddTitle(false);
      } catch (error) {
        console.error("Error updating task data:", error);
      }
    }
  };
  const filteredTasks = tasks.find((task) => task.id === cardId)?.task || [];
  console.log(filteredTasks)
  return (
    <div className={styles["add-Card"]}>
      <div className={styles["title-more-icon"]}>
        <span className={styles.title}>{title}</span>
        <span>
          <MdMoreHoriz className={styles["more-icon"]} />
        </span>
      </div>
      <div className={styles["task-container"]}>
        {filteredTasks.map((subTask) => (
          <div key={subTask.id} className={styles["task-item"]}>
            <span style={{ marginLeft: "1rem" }}>{subTask.taskName}</span>
            {/* <span>{subTask.taskDescription}</span> */}
            <span style={{ marginRight: "1rem" }}><MdModeEdit /></span>
          </div>
        ))}
      </div>
      {isAddTitle && (
        <div className={styles["add-title"]}>
          <div>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter a title for this card..."
                style={{ minHeight: '300px', overflow: 'hidden' }}
                className={styles["add-input"]}
                value={addTitle}
                onChange={(e) => setAddTitle(e.target.value)}
              />
            </FloatingLabel>
          </div>

          <div>
            <button
              className={styles["add-btn"]}
              onClick={handleAddTask}
            >
              Add Task
            </button>
            <span onClick={() => setIsAddTitle(false)}>
              <MdClose size={25} className={styles["close-btn"]} />
            </span>
          </div>
        </div>
      )}

      {!isAddTitle && (
        <div onClick={() => setIsAddTitle(true)}>
          <div className={styles["add-list"]}>
            <MdAdd className={styles["add-icon"]} size={25} />
            <span className={styles["add-text"]}>Add task</span>
            
          </div> 
          <span><img src={Templatelogo} /></span>
        </div>
      )}


    </div>
  );
};

export default Card;
