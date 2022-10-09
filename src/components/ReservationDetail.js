import React from "react";
import { Box, Button, Modal } from "@mui/material";

const ReservationDetail = ({ onClose, reservation }) => {
  return (
    <Modal hideBackdrop open={!!reservation} onClose={onClose}>
      <Box sx={{}}>
        <h2 id="child-modal-title">Text in a child modal</h2>
        <p id="child-modal-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <Button onClick={onClose}>Close Child Modal</Button>
      </Box>
    </Modal>
  );
};

export default ReservationDetail;
