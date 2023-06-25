import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CustomModalProps } from './CustomModalTypes';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const CustomModal = (props: CustomModalProps) => {
  return (
    <Modal open={props.open}
      onClose={props.handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description' >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {props.title}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          {props.content}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          {props.grading}
        </Typography>
      </Box>
    </Modal>
  );
};

export default CustomModal;
