import { useMemo, useState } from 'react';
import { StudentAnswer, StudentAnswersProps } from '../entities/StudentAnswersTypes';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Person4Icon from '@mui/icons-material/Person4';


const StudentsAnswers = (props: StudentAnswersProps) => {
  //this should be a map of student name to InsightView
  // TODO: Handle answermap from props.examId
  const answerMap: StudentAnswer[] = []; // props.studentAnswers;

  const [idx, setIdx] = useState(0);

  const showStudentAnswer = useMemo(() => {
    if (idx < 0) return null;
    return answerMap[idx];
  }, [idx]);
  return (

    <div className='flex w-full h-screen '>
      {/* <div className='w-1/3 h-screen text-center bg-gray-300 p-2 m-2'>
        <h1>Students</h1>
        {answerMap.map((item, index) => {
          return (
            <div className='flex justify-between '>
              <span className='text-center w-full bg-white m-2 p-2 rounded-lg'
                onMouseDown={() => { setIdx(index); }}
              >{item.Name}</span>
            </div>
          );
        })}
      </div> */}
      <div className='w-[720px] border-r-2 h-screen text-center border-e-2 p-2 m-2 overflow-hidden'>
        <List component='nav' aria-label='main mailbox folders'>
          {answerMap.map((item, index) => {
            return (
              <ListItemButton className='border'
                style={{ }}
                selected={idx === index}
                onClick={() => setIdx(index)}
              >
                <ListItemIcon>
                  <Person4Icon />
                </ListItemIcon>
                <ListItemText primary={item.Name} />
              </ListItemButton>
            );
          })}
        </List>
      </div>
      <div className='w-full h-screen  text-center bg-gray-300 p-2 m-2'>
        <h1>each students answers</h1>
        <span className=''>{showStudentAnswer?.Name}</span>
        <div className='bg-white rounded-lg  p-2 w-full' >{
          showStudentAnswer ? showStudentAnswer.Answer : answerMap[idx].Name}</div>
      </div>
    </div>

  );
};

export default StudentsAnswers;
