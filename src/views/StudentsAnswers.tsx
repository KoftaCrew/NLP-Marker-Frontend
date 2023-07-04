/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Student } from '../entities/StudentAnswersTypes';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Person4Icon from '@mui/icons-material/Person4';
import InsightsViewer from '../components/InsightsViewer/InsightsViewer';
import { Card, Container, Divider, LinearProgress, Typography } from '@mui/material';
import When from '../components/When';
import { Question } from '../entities/Question';
import axiosInstance from '../services/AxiosService';
import { QuestionsResultsSerializer } from '../serializers/QuestionSerializer';


const StudentsAnswers = (props: { id: number }) => {

  const [selectedStudentIndex, setSelectedStudentIndex] = useState(-1);
  const [students, setStudents] = useState<Student[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [examLoading, setExamLoading] = useState(true);

  useEffect(() => {

    const fetchStudents = async () => {

      const response = await axiosInstance.get('/student-answer/student/', {params: {exam:props.id}});
      const fetchedStudents = response.data.map((student: any)=>({
        id: student.student_id,
        name: student.student_name,
        studentSessionId: student.id
      }));
      setStudents(fetchedStudents);
    };
    setLoading(true);

    fetchStudents().then(() => {setLoading(false); setSelectedStudentIndex(0);});
  }, []);

  useEffect(() => {

    const fetchExam = async () => {
      if (selectedStudentIndex == -1)
        return;
      setExamLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axiosInstance(`/student-answer/result/${students[selectedStudentIndex].studentSessionId}`);

      setQuestions(QuestionsResultsSerializer(response.data));

    };
    fetchExam().then(() => (setExamLoading(false)));
  }, [selectedStudentIndex]);


  const calculateTotalGrade = (index : number) => {
    let totalGrade = 0;
    questions[index].modelAnswer.segments?.map((segment) => {
      totalGrade += segment.grade?? 0;
    });
    return totalGrade;
  };

  return (

    <div className='flex w-full h-full '>
      <When isTrue={loading}>
        <Container>
          <LinearProgress />
        </Container>
      </When>
      <When isTrue={!loading}>
        <div className='w-96 h-full overflow-y-auto border-r-2 p-2'>
          <List component='nav' aria-label='main mailbox folders'>
            {students.map((student, index) => {
              return (
                <ListItemButton className='border'
                  style={{ }}
                  selected={selectedStudentIndex === index}
                  onClick={() => {setSelectedStudentIndex(index);}}
                >
                  <ListItemIcon>
                    <Person4Icon />
                  </ListItemIcon>
                  <ListItemText primary={student.name} />
                </ListItemButton>
              );
            })}
          </List>
        </div>
        <div className='bg-gray-200/5 w-full h-full overflow-y-auto'>
          <Container className='p-4 mt-4'>
            {
              students.length > 0 &&
              <div className='flex justify-between px-1'>
                <Typography variant='h4' className='pb-4'>Name: {students[selectedStudentIndex].name}</Typography>
                <Typography variant='h4' className='pb-4'>ID: {students[selectedStudentIndex].id}</Typography>
              </div>
            }
            <When isTrue={examLoading}>
              <LinearProgress />
            </When>
            <When isTrue={!examLoading}>
              <Card className='p-4 py-8 flex flex-col gap-4'>
                {questions.map((question, index) => (
                  <div>
                    <Typography><div className='mb-1 mx-2 flex gap-1'>
                      <div>{index + 1}.</div> {question.title}</div>
                    </Typography>

                    <div className='rounded-lg  p-2 w-full'>
                      <InsightsViewer
                        question={question}/>
                    </div>
                    <div className='h-fit p-1 mx-4 flex justify-end'>
                      <Typography variant='h6'><div className='font-bold'>
                        Grade: {question.grade?.toFixed(2)}/{calculateTotalGrade(index)}
                      </div></Typography>
                    </div>
                    <div className='my-4'>
                      {index + 1 < questions.length &&
                    <Divider/>
                      }
                    </div>
                  </div>
                ))}
              </Card>
            </When>
          </Container>
        </div>
      </When>
    </div>

  );
};

export default StudentsAnswers;
