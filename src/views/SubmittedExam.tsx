import { Container, Typography } from "@mui/material";

const SubmittedExam = () => {
  return (
    <div className='h-full flex items-center'>
      <Container>
        <div className='text-center'>
          <Typography variant='h4'>
            You answers has been submitted
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default SubmittedExam;
