import {
  Dispatch,
  SetStateAction,
} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '6px',
  transform: 'translate(-50%, -50%)',
  width: {
    md: 600,
    xs: '90%',
  },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type BasicModalPropsType = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
}

const BasicModal = ({
  children,
  isOpen,
  setIsOpen,
  title,
}: BasicModalPropsType) => {
  const handleClose = () => setIsOpen(false);

  return (
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h6"
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

export default BasicModal;
