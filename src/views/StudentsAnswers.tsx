import { useMemo, useState } from "react";

const StudentsAnswers = () => {
  //this should be a map of student name to InsightView
  const answerMap = [{ Name: 'Student 1', Answer: 'test' }];

  const [idx, setIdx] = useState(-1);

  const showStudentAnswer = useMemo(() => {
    if (idx < 0) return null;
    return answerMap[idx];
  }, [idx]);
  return (
    <>
      <div className='flex'>
        <div className='w-1/3 text-center bg-gray-300 p-2 m-2'>
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
        </div>
        <div className='w-2/3 text-center bg-gray-300 p-2 m-2'>
          <h1>each students answers</h1>
          <div className='bg-white rounded-lg m-2 p-2'>{
            showStudentAnswer ? showStudentAnswer.Answer : null}</div>
        </div>
      </div>
    </>
  );
};

export default StudentsAnswers;
