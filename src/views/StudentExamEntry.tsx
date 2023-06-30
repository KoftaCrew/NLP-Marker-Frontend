/* eslint-disable camelcase */
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Student } from "../entities/StudentAnswersTypes";
import StudentsExam from "./StudentsExam";
import { unauthenticatedAxiosInstance } from "../services/AxiosService";

const StudentsExamEntry = (props: { id: number }) => {


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [examName, setExamName] = useState('');
  const [examView, setExamView] = useState(false);
  const [student, setStudent] = useState<Student>({name:'', id:''});
  const [studentSessionId, setStudentSessionId] = useState(-1);

  useEffect(()=>{
    setExamName('English Exam');
  }, []);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newStudent = {
      name: (event.target as HTMLFormElement).studentName.value,
      id: (event.target as HTMLFormElement).studentID.value
    };
    setStudent(newStudent);
    const response = await unauthenticatedAxiosInstance.post('/student-answer/student/', {
      exam: props.id,
      student_id: newStudent.id,
      student_name: newStudent.name
    });
    setStudentSessionId(response.data.id);

    setLoading(false);
    setExamView(true);
  };

  return (
    <>
      {examView? <StudentsExam studentSessionId={studentSessionId} examId={props.id} student={student}/> :
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
