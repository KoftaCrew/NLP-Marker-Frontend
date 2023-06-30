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


const StudentsAnswers = (props: { id: number }) => {

  const [selectedStudent, setSelectedStudent] = useState(0);
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchExam = async () => {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStudents([
        {
          id: '20190001',
          name: 'Kofta'
        },
        {
          id: '20190002',
          name: 'Karim'
        },
        {
          id: '20190003',
          name: 'Flasha'
        },
        {
          id: '20190004',
          name: 'Dova'
        },
        {
          id: '20190005',
          name: 'Bingo'
        }
      ]);
      setSelectedStudentName('Kofta');
    };
    setLoading(true);

    fetchExam().then(() => (setLoading(false)));
  }, []);

  useEffect(() => {

    const fetchExam = async () => {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setQuestions([
        {
          title: `two lines question two lines question two lines question two lines question
            two lines question two lines question two lines question two lines question
            two lines question two lines question two lines question two lines question`,
          modelAnswer: {
            body: 'model model model model',
            segements: [
              {
                start:1,
                end:4
              },
              {
                start: 9,
                end: 11
              },
              {
                start: 15,
                end: 20
              }
            ]
          },
          studentAnswer: {
            body: 'ans ans ans ans ans ans',
            segements: [
              {
                start:1,
                end:4
              },
              {
                start: 9,
                end: 11
              }
            ]
          },
          segementsMap: [[0, 1], [0]]
        },
        {
          title: 'test test test test',
          modelAnswer: {
            body: 'model model model model',
            segements: [
              {
                start:1,
                end:4
              },
              {
                start: 9,
                end: 11
              }
            ]
          },
          studentAnswer: {
            body: 'ans ans ans ans ans ans',
            segements: [
              {
                start:1,
                end:4
              },
              {
                start: 9,
                end: 11
              }
            ]
          },
          segementsMap: [[0, 1], [0]]
        },
        {
          title: 'test test test test',
          modelAnswer: {
            body: 'model model model model',
            segements: [
              {
                start:1,
                end:4
              },
              {
                start: 9,
                end: 11
              }
            ]
          },
          studentAnswer: {
            body: 'ans ans ans ans ans ans',
            segements: [
              {
                start:1,
                end:4
              },
              {
                start: 9,
                end: 11
              }
            ]
          },
          segementsMap: [[0, 1], [0]]
        },
        {
          title: 'test test test test',
          modelAnswer: {
            body: 'model model model model',
            segements: [
              {
                start:1,
                end:4
              },
              {
                start: 9,
                end: 11
              }
            ]
          },
          studentAnswer: {
            body: 'ans ans ans ans ans ans',
            segements: [
              {
                start:1,
                end:4
              },
              {
                start: 9,
                end: 11
              }
            ]
          },
          segementsMap: [[0, 1], [0]]
        }
      ]);
    };
    setLoading(true);

    fetchExam().then(() => (setLoading(false)));
  }, []);


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
                  selected={selectedStudent === index}
                  onClick={() => {setSelectedStudent(index); setSelectedStudentName(student.name);}}
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
            <Typography variant='h4' className='pb-4'>{selectedStudentName}</Typography>
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
                    <Typography variant='h6'><div className='font-bold'>Grade: 10/10</div></Typography>
                  </div>
                  <div className='my-4'>
                    {index + 1 < questions.length &&
                    <Divider/>
                    }
                  </div>
                </div>
              ))}
            </Card>
          </Container>
        </div>
      </When>
    </div>

  );
};

export default StudentsAnswers;
