import { Container, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const SubmittedExam = () => {
  return (
    <div className='h-full flex items-center'>
      <Container>
        <div className='flex justify-center'>
          <div className='text-center'>
            <Typography variant='h4'>
            You answers has been submitted
            </Typography>
          </div>
          <CheckIcon fontSize='large' color='success'/>
        </div>
      </Container>
    </div>
  );
};

export default SubmittedExam;
