import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Box,
  } from '@chakra-ui/react'
import TextEditor from "./TextEditor";
const Card = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [isPopup,setIsPopup] = useState(false);
  const handleAdd=() => {
   let card=text;
   let cards=[...list,card]
   setList(cards)
  }

  function ManualClose({text}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Button onClick={onOpen}>{text}</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Task : {text}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            </ModalBody>
               <Box>
                <TextEditor/>
               </Box>
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  return (
    <div style={{ width: "300px", height: "300px", background: "black" }}>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        <h1>List</h1>
        {list.map((item) => {
          return (
            <div
              style={{
                width: "100%",
                color: "white",
                border: "1px solid white",
                padding: "10px",
              }}
            >
                <ManualClose text={text}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
