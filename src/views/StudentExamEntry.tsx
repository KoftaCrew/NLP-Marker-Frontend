/* eslint-disable camelcase */
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Student } from "../entities/StudentAnswersTypes";
import StudentsExam from "./StudentsExam";
import { unauthenticatedAxiosInstance } from "../services/AxiosService";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";

const StudentsExamEntry = () => {


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [examName, setExamName] = useState('');
  const [examView, setExamView] = useState(false);
  const [student, setStudent] = useState<Student>({name:'', id:''});
  const [studentSessionId, setStudentSessionId] = useState(-1);

  const params = useParams();
  const examId = Number(params.examId);

  useEffect(()=> {
    const fetchExam = async () => {
      const response = await unauthenticatedAxiosInstance.get(`/exam/card/${examId}/`);
      setExamName(response.data.name);
    };
    fetchExam();
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
    try{
      const response = await unauthenticatedAxiosInstance.post('/student-answer/student/', {
        exam: examId,
        student_id: newStudent.id,
        student_name: newStudent.name
      });
      setStudentSessionId(response.data.id);
      setExamView(true);
    }catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          error.message && setError(error.message);
        } else {
          setError(error.response.data.detail ?? error.message);
        }
      }
    }
    setLoading(false);
  };

  return (
    <>
      {examView? <StudentsExam studentSessionId={studentSessionId} examId={examId} student={student}/> :
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
