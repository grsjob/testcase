import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FC, useEffect } from "react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
    children: React.ReactNode;
    isOpen: boolean
    onClose?: React.Dispatch<React.SetStateAction<boolean>> ;
    ariaDescription: string;
}

const BaseModal: FC<BasicModalProps> = ({ children, isOpen, ariaDescription, onClose }) => {
  const [ open, setOpen ] = React.useState(isOpen);
  const handleClose = () => {
    setOpen(false);
    if(onClose) {
      onClose(true);
    }
  };

  useEffect(() => {
    isOpen ? setOpen(true) : setOpen(false);
  }, [ isOpen ]);

  return (
    <div className='modal'>
      <Modal
        open={isOpen || open}
        onClose={handleClose}
        aria-labelledby="Модальное окно"
        aria-describedby={ariaDescription}
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default BaseModal;