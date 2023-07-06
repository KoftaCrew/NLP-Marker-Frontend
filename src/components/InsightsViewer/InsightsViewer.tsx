import { useEffect, useState } from "react";
import { InsightsViewerProps } from "./InsightsViewerTypes";
import { AnswerToken, ModelAnswer } from "../../entities/ModelAnswerTypes";
import { Tooltip } from "@mui/material";

const defaultBackgroundColor = '#b1dae7';
const EmptySegmentBackgroundColor = '#e7b1b1';

const EmptyToken : AnswerToken = {
  token:'',
  isSegment:false,
  mappedSegmentId: [],
  id: -1,
  grade: 0
};

const tokenParser = (modelAnswer: ModelAnswer) => {
  let last = 0;
  const tokens :AnswerToken[] = [];
  modelAnswer.segments?.map((segment)=>{
    if (last < segment.start) {
      tokens.push({
        token: modelAnswer.body.substring(last, segment.start),
        isSegment: false,
        id: -1,
        mappedSegmentId: [],
        grade: 0
      });
    }
    tokens.push({
      token: modelAnswer.body.substring(segment.start, segment.end),
      isSegment: true,
      id: segment.id? segment.id: -1,
      mappedSegmentId: segment.mappedSegment? [segment.mappedSegment]: [],
      grade: segment.grade? segment.grade: 0,
      ...(segment.similarity && {similarity: segment.similarity})
    });
    last = segment.end;
  });
  if (last != modelAnswer.body.length) {
    tokens.push({
      token: modelAnswer.body.substring(last, modelAnswer.body.length),
      isSegment: false,
      id: -1,
      mappedSegmentId: [],
      grade: 0
    });
  }
  return tokens;
};

const InsightsViewer = (props: InsightsViewerProps) => {

  if (!props.question.studentAnswer) {
    return <></>;
  }
  const [studentTokens, setStudentTokens] = useState<AnswerToken[]>(tokenParser(props.question.studentAnswer));
  const [modelTokens, setModelTokens] = useState<AnswerToken[]>(tokenParser(props.question.modelAnswer));

  useEffect(()=> {
    const studentMapper = new Map();
    studentTokens.map((token)=>
      studentMapper.set(token.mappedSegmentId, {id : token.id, grade: token.grade}));

    const modelMapper = new Map();
    modelTokens.map((token)=>
      modelMapper.set(token.id, token.grade));


    setModelTokens(modelTokens.map((token)=> {
      studentTokens.map((studentToken) => {
        if (studentToken.mappedSegmentId.length &&
          studentToken.mappedSegmentId[0] === token.id) {
          token.mappedSegmentId.push(studentToken.id);
          token.maxGrade = Math.max(token.maxGrade? token.maxGrade: 0, studentToken.grade);
        }
      });
      return token;
    }));

    setStudentTokens(studentTokens.map((token)=> {
      if (token.mappedSegmentId.length != 0) {
        token.maxGrade = modelMapper.get(token.mappedSegmentId[0]);
      }
      return token;
    }));

  }, []);

  const [selectedStudentToken, setSelectedStudentToken] = useState<AnswerToken>(EmptyToken);
  const [selectedModelToken, setSelectedModelToken] = useState<AnswerToken>(EmptyToken);


  const handleMouseLeave = () => {
    setSelectedStudentToken(EmptyToken);
    setSelectedModelToken(EmptyToken);
  };

  return (
    <div className='bg-white w-full'>
      <div className='flex justify-evenly text-center mb-2'>
        <div className='font-semibold w-1/2'>
              Student Answer
        </div>
        <div className='font-semibold w-1/2'>
              Model Answer
        </div>
      </div>
      <div className='flex justify-evenly'>
        <div className='m-2 p-2 h-52 overflow-y-auto bg-white
            rounded border-solid border-[1px] border-gray-500/25 shadow-md w-1/2'>
          {
            studentTokens.map((studentToken) =>(
              <Tooltip
                title={ <div className='text-lg'>
                  <span className='font-bold'>Grade: </span>
                  <span>{studentToken.grade? Number.isInteger(studentToken.grade)?
                    studentToken.grade: studentToken.grade.toFixed(2) : 0}/{studentToken.maxGrade}</span>
                  {studentToken.similarity && <div>Similarity: {Math.round(studentToken.similarity * 100)}%</div>}
                </div>}
                followCursor
                arrow
                disableHoverListener={!studentToken.isSegment}>
                <span
                  style={{
                    backgroundColor: studentToken.isSegment &&
                (selectedStudentToken.id === studentToken.id ||
                  selectedModelToken.mappedSegmentId.includes(studentToken.id))
                      ? (studentToken.mappedSegmentId.length?
                        defaultBackgroundColor : EmptySegmentBackgroundColor) : "white"
                  }}
                  onMouseEnter={() => {
                    setSelectedStudentToken(studentToken);
                  }}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  {studentToken.token}
                </span>
              </Tooltip>))
          }
        </div>

        <div className='m-2 p-2 h-52 overflow-y-auto bg-white
            rounded border-solid border-[1px] border-gray-500/25 shadow-md w-1/2'>
          {
            modelTokens.map((modelToken) =>
              <Tooltip
                title={ <div className='text-lg'>
                  <span className='font-bold'>Grade: </span>
                  <span>{modelToken.maxGrade? modelToken.maxGrade.toFixed(2) : 0}/{modelToken.grade ?? 'N/A'}</span>
                </div>}
                followCursor
                arrow
                disableHoverListener={!modelToken.isSegment}>
                <span
                  style={{
                    backgroundColor: modelToken.isSegment &&
                  (selectedModelToken.id === modelToken.id ||
                    selectedStudentToken.mappedSegmentId.includes(modelToken.id))
                      ? (modelToken.mappedSegmentId.length?
                        defaultBackgroundColor : EmptySegmentBackgroundColor) : "white"
                  }}
                  onMouseEnter={() => {
                    setSelectedModelToken(modelToken);
                  }}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  {modelToken.token}
                </span>
              </Tooltip>)
          }
        </div>
      </div>
    </div>
  );
};

export default InsightsViewer;
