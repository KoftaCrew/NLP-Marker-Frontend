import { Card,
  CardContent,
  ThemeProvider,
  Typography,
  createTheme,
  TextField,
  Button,
  Container,
  LinearProgress } from "@mui/material";
import React from "react";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { AppBarContext } from "../store/AppBarContext";
import { StudentExam } from "../entities/Exam";
import When from "../components/When";
import { StudentQuestion } from "../entities/Question";
import { Student } from "../entities/StudentAnswersTypes";


const StudentsExam = (props: { id: string, student: Student }) => {

  const [loading, setLoading] = useState(true);
  const [studentExam, setStudentExam] = useState<StudentExam>({
    id: '',
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

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStudentExam({
        id: props.id,
        name: 'OOP',
        questions: [
          {
            title: "summer is cold or hot",
            studentAnswer: ''
          },
          {
            title: "summer is cold or hot 2",
            studentAnswer: ''
          },
          {
            title: "summer is cold or hot 3",
            studentAnswer: ''
          },
          {
            title: "summer is cold or hot 3",
            studentAnswer: ''
          },
          {
            title: "summer is cold or hot 3",
            studentAnswer: ''
          }
        ]
      });
    };
    setLoading(true);

    fetchExam().then(() => (setLoading(false)));
  }, []);

  const handleAnswerOnChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].studentAnswer = e.target.value;
    setQuestions(newQuestions);
  };

  return (
    <div className='bg-gray-200/5'>
      <Container>
        <When isTrue={loading}>
          <LinearProgress />
        </When>
        <Card className='p-6 my-8'>
          <div className='flex justify-between'>
            <Typography variant="h5">Name: {props.student.name}</Typography>
            <Typography variant="h5">ID: {props.student.id}</Typography>
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
            <Button className='w-32' color='primary' variant='contained'>Submit</Button>
          </div>
        </When>
      </Container>
    </div>
  );
};

export default StudentsExam;