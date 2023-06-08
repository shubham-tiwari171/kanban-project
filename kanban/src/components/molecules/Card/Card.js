import { MdMoreHoriz, MdAdd, MdClose, MdDescription, MdOutlineDelete } from "react-icons/md";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { setCardObject, deleteCard } from "../../../redux/reducers/reducers"
import styles from "./card.module.css";

const Card = ({ title, cardId }) => {
	const [isAddTitle, setIsAddTitle] = useState(false);
	const [addTitle, setAddTitle] = useState("");
	const [tasks, setTasks] = useState([]);
	const [editedTaskName, setEditedTaskName] = useState('')
	const [isMoreClicked, setIsMoreClicked] = useState(false)
	const [cardDeleted, setCardDeleted] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch()

	useEffect(() => {
		fetchTasks();
	}, [cardId]);

	const fetchTasks = async () => {
		try {
			const response = await axios.get("http://localhost:4000/cards");
			const tasksData = response.data;
			setTasks(tasksData);
		} catch (error) {
			console.error("Error fetching tasks data:", error);
		}
	};

	const handleAddUpdateTask = async () => {
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
				const changedTaskIndex = updatedTasks.findIndex((task) => task.id === cardId);
				await axios.put(`http://localhost:4000/cards/${cardId}`, updatedTasks[changedTaskIndex]);
				setTasks((prevState) => {
					const updatedState = [...prevState];
					updatedState[changedTaskIndex] = updatedTasks[changedTaskIndex];
					return updatedState;
				});
				setAddTitle("");
				setIsAddTitle(false);
			} catch (error) {
				console.error("Error updating task data:", error);
			}
		}
	};

	const filteredTasks = tasks.find((task) => task.id === cardId)?.task || [];

	const handleRouteClick = (taskId) => {
		let particularTaskObj = filteredTasks.find((task) => task.id === taskId);
		let cardObject = tasks.find((card) => card.id === cardId);
		dispatch(setCardObject(cardObject));
		navigate(`/description/${taskId}`);
	};

	const handleMoreIcon = () => {
		setIsMoreClicked(true)
	}

	const handleDeleteCard = async () => {
		try {
			await axios.delete(`http://localhost:4000/cards/${cardId}`);
			setTasks(prevTasks => prevTasks.filter(card => card.id !== cardId));
			setCardDeleted(true);
		} catch (error) {
			console.error("Error deleting card:", error);
		}
	};

	return (
		!cardDeleted && (
			<div className={styles["add-Card"]}>
				<div className={styles["title-more-icon"]}>
					<span className={styles.title}>{title}</span>
					<span onClick={handleMoreIcon}>
						<MdMoreHoriz className={isMoreClicked ? styles["more-icon-hidden"] : styles["more-icon"]} />
					</span>
					{isMoreClicked && <div onClick={handleDeleteCard}><MdOutlineDelete className={styles["delete-icon"]} size={25} /></div>}
				</div>
				<div className={styles["task-container"]}>
					{filteredTasks.map((subTask) => (
						<div key={subTask.id} className={styles["task-item"]}>
							<span style={{ marginLeft: "1rem" }}>{subTask.taskName}</span>
							<span style={{ marginRight: "1rem" }}>
								<MdDescription size={20} onClick={() => handleRouteClick(subTask.id)} />
							</span>
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
									value={editedTaskName !== "" ? editedTaskName : addTitle}
									onChange={(e) => setAddTitle(e.target.value)}
								/>
							</FloatingLabel>
						</div>

						<div>
							<button className={styles["add-btn"]} onClick={handleAddUpdateTask}>
								Add task
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
					</div>
				)}
			</div>
		)
	);
};

export default Card;
