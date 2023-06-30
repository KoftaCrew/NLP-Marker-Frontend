/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Container,
  LinearProgress
} from "@mui/material";
import React from "react";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { AppBarContext } from "../store/AppBarContext";
import { StudentExam } from "../entities/Exam";
import When from "../components/When";
import { StudentQuestion } from "../entities/Question";
import { Student } from "../entities/StudentAnswersTypes";
import { unauthenticatedAxiosInstance } from "../services/AxiosService";
import { LoadingButton } from "@mui/lab";
import SubmittedExam from "./SubmittedExam";


const StudentsExam = (props: { studentSessionId: number, examId: number, student: Student }) => {

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentExam, setStudentExam] = useState<StudentExam>({
    id: -1,
    name: '',
    questions: []
  });
  const { setAppBarTitle } = useContext(AppBarContext);
  useEffect(() => {
    setAppBarTitle(studentExam.name);
  }, [studentExam]);

  const questions = useMemo(() => studentExam.questions, [studentExam]);
  const setQuestions = useCallback((questions: StudentQuestion[]) => {
    setStudentExam({ ...studentExam, questions });
  }, [studentExam]);

  useEffect(() => {

    const fetchExam = async () => {
      const exam = (await unauthenticatedAxiosInstance.get(`/exam/student-view/${props.examId}`)).data;
      setStudentExam(
        {
          name: exam.name,
          id: exam.id,
          questions: exam.exam_questions.map((question:any) => ({
            title: question.question,
            id: question.id,
            studentAnswer: ''
          }))
        }
      );
    };
    setLoading(true);

    fetchExam().then(() => (setLoading(false)));
  }, []);

  const handleAnswerOnChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].studentAnswer = e.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmitOnClick = () => {
    setSubmitLoading(true);
    unauthenticatedAxiosInstance.patch(`/student-answer/submit/${props.studentSessionId}/`, {
      student_answer: studentExam.questions.map((question)=>({
        question: question.id,
        text: question.studentAnswer
      }))
    });
    setSubmitLoading(false);
    setIsSubmitted(true);
  };

  return (
    <>
      <When isTrue={isSubmitted}>
        <SubmittedExam/>
      </When>
      <When isTrue={!isSubmitted}>
        <div className='bg-gray-200/5'>
          <Container>
            <When isTrue={loading}>
              <LinearProgress />
            </When>
            <Card className='p-6 my-8'>
              <div className='flex justify-between'>
                <Typography variant='h5'>Name: {props.student.name}</Typography>
                <Typography variant='h5'>ID: {props.student.id}</Typography>
              </div>
            </Card>
            <Card className='min-h-fit my-8'>
              {questions.map((question, index) => (
                <CardContent>
                  <Typography>{index + 1}. {question.title}</Typography>
                  <TextField
                    id='standard-basic'
                    key={index}
                    label='Answer'
                    variant='outlined'
                    multiline
                    rows='6'
                    margin='normal'
                    value={question.studentAnswer}
                    onChange={handleAnswerOnChange(index)}
                    sx={{ backgroundColor: '#FFFFFF', width: '100%', borderRadius: 2 }}
                  />
                </CardContent>
              ))}
            </Card>
            <When isTrue={!loading}>
              <div className='flex justify-center px-28 pb-12'>
                <LoadingButton loading={submitLoading} className='w-32' onClick={handleSubmitOnClick}
                  color='primary' variant='contained'>Submit</LoadingButton>
              </div>
            </When>
          </Container>
        </div>
      </When>
    </>
  );
};

export default StudentsExam;
