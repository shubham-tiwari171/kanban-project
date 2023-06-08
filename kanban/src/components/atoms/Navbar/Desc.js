import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./Desc.css";
import { EditIcon, ViewIcon, HamburgerIcon, RepeatClockIcon } from "@chakra-ui/icons";
import TextEditor from "../TextEditor";
const Desc = () => {
  const [descFocus, setDescFocus] = useState(false);
  const [ActiFocus,setActiveFocus]=useState(false);
  const card = useSelector((state) => state.kanbanData.card);
  console.log("hellooooooo",card);
  let id = useParams();
   console.log(id)
  return (
    <div className="Desc-page">
      <div className="Desc-container">
        <div className="Task-div">
          <EditIcon />
          <h3>Task Name</h3>
        </div>
        <div className="Notification">
          <br />
          <p>Notifications</p>
          <button className="Notification-icon">{<ViewIcon />}</button>
        </div>
        <div className="Desc-box">
          <div className="Task-div">
            <HamburgerIcon />
            <h3>Description</h3>
          </div>
          <div>
            {descFocus ? (
              <div className="Editor">
                <TextEditor />
                <div className="Editor-button">
                  <button onClick={() => setDescFocus(false)}>Save</button>
                  <button onClick={() => setDescFocus(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Add Description Here..."
                onFocus={() => setDescFocus(true)}
                onBlur={() => setDescFocus(false)}
              />
            )}
          </div>
          <div>
            <div className="Task-div">
              <RepeatClockIcon />
              <h3>Activity</h3>
            </div>
            <div>
            {ActiFocus ? (
              <div className="Editor">
                <TextEditor />
                <div className="Editor-button">
                  <button onClick={() => setActiveFocus(false)}>Save</button>
                  <button onClick={() => setActiveFocus(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Add Activity Here..."
                onFocus={() => setActiveFocus(true)}
                onBlur={() => setActiveFocus(false)}
              />
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desc;
