import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '6px',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const BasicModal = ({
  children,
  isOpen,
  setIsOpen,
  title,
}) => {
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              marginBottom: '15px'
            }}
          >
            {title}
          </Typography>
          {children}
        </Box>
      </Modal>
  );
}
