import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Student } from "../entities/StudentAnswersTypes";
import StudentsExam from "./StudentsExam";

const StudentsExamEntry = (props: { id: string }) => {


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [examName, setExamName] = useState('');
  const [examView, setExamView] = useState(false);
  const [student, setStudent] = useState<Student>({name:'', id:''});

  useEffect(()=>{
    setExamName('English Exam');
  }, []);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStudent({
      name: (event.target as HTMLFormElement).studentName.value,
      id: (event.target as HTMLFormElement).studentID.value
    });
    setLoading(false);
    setExamView(true);
  };

  return (
    <>
      {examView? <StudentsExam id={props.id} student={student}/> :
        <div className='w-full h-full flex justify-center content-center flex-wrap'>
          <Box
            component='form'
            className='flex flex-col justify-center content-center gap-5 w-1/4 h-1/2 bg-gray-300/10 p-12 rounded-lg'
            onSubmit={handleOnSubmit}
          >
            <Typography className='text-center' variant='h4'>{examName}</Typography>
            <TextField
              required
              id='studentName'
              label='Name'
              variant='outlined'
            />
            <TextField
              required
              id='studentID'
              label='ID'
              variant='outlined'
            />
            <Typography variant='body1' color='error'>{error}</Typography>
            <LoadingButton
              variant='contained'
              type='submit'
              loading={loading}
            >
        Enter Exam
            </LoadingButton>
          </Box>
        </div> }
    </>);
};

export default StudentsExamEntry;
