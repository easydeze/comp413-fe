import { Modal, Box, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

interface PopupProps {
  msg1: string;
  msg2: string;
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ msg1, msg2, onClose }) => {
  return msg2 !== "" ? (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {msg1}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {msg2}
        </Typography>
      </Box>
    </Modal>
  ) : (
    <></>
  );
};
