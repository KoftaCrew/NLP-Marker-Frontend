import { useState } from "react";
import { InsightsViewerProps } from "./InsightsViewerTypes";
import { AnswerToken, ModelAnswerSegment } from "../../entities/ModelAnswerTypes";
import { Question } from "../../entities/Question";

const defaultBackgroundColor = '#b1dae7';
const EmptySegmentBackgroundColor = '#e7b1b1';

const EmptyToken : AnswerToken = {
  token:'',
  isSegment:false,
  mappedSegments: [],
  segmentIndex: 0
};

const bodyParser = (body: string, segments: ModelAnswerSegment[]) => {
  let last = 0;
  let tokens : {token: string, isSegment: boolean}[] = [];
  for (let index = 0; index < segments.length; ++index) {
    if (last < segments[index].start) {
      tokens = [...tokens, {token: body.substring(last, segments[index].start),
        isSegment: false}];
      last = index;
    }
    tokens = [...tokens,
      {
        token: body.substring(segments[index].start,
          segments[index].end),
        isSegment: true
      }
    ];
    last = segments[index].end;
  }
  if (last != body.length) {
    tokens = [...tokens, {token: body.substring(last, body.length), isSegment: false}];
  }
  return tokens;
};

const Parser = (question: Question) => {

  const studentSegments = question.studentAnswer?.segements? question.studentAnswer.segements:[];
  const studentTokens = question.studentAnswer?
    bodyParser(question.studentAnswer.body, studentSegments): [];

  const modelSegments = question.modelAnswer?.segements? question.modelAnswer.segements:[];
  const modelTokens = question.modelAnswer?
    bodyParser(question.modelAnswer.body, modelSegments): [];

  const modelSegmentsMapper :number[] = [];
  modelTokens.map((modelToken, index) => (
    modelToken.isSegment && modelSegmentsMapper.push(index)
  ));

  const tokenizedModel : AnswerToken[] = [];
  const tokenizedStudent : AnswerToken[] = [];

  const studentSegmentMapper = (index: number) => {
    const unMappedSegments = question.segementsMap? question.segementsMap[index] : [];
    const mappedSegments = unMappedSegments.map((index)=> (
      index = modelSegmentsMapper[index]
    ));
    return mappedSegments;
  };

  let iterator = 0;
  studentTokens.map((studentToken, index) => (
    tokenizedStudent.push({
      token: studentToken.token,
      isSegment: studentToken.isSegment,
      mappedSegments: studentToken.isSegment? studentSegmentMapper(iterator++) : [],
      segmentIndex: index
    })
  ));

  modelTokens.map((modelToken, index) => (
    tokenizedModel.push({
      token: modelToken.token,
      isSegment: modelToken.isSegment,
      mappedSegments: [],
      segmentIndex: index
    })
  ));

  tokenizedStudent.map((token, studentIndex) => (
    token.mappedSegments.map((modelIndex) => (
      tokenizedModel[modelIndex].mappedSegments.push(studentIndex)
    ))
  ));

  return {tokenizedStudent:tokenizedStudent,
    tokenizedModel:tokenizedModel};
};

const InsightsViewer = (props: InsightsViewerProps) => {


  const tmp = Parser(props.question);

  const studentTokens = tmp.tokenizedStudent;


  const modelTokens = tmp.tokenizedModel;


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
            studentTokens.map((studentToken, index) =>
              <span
                style={{
                  backgroundColor: studentToken.isSegment &&
                (selectedStudentToken.segmentIndex == index ||
                  selectedModelToken.mappedSegments.includes(studentToken.segmentIndex))
                    ? (studentToken.mappedSegments.length > 0?
                      defaultBackgroundColor : EmptySegmentBackgroundColor) : "white"
                }}
                onMouseEnter={() => {
                  setSelectedStudentToken(studentToken);
                }}
                onMouseLeave={() => handleMouseLeave()}
              >
                {studentToken.token}
              </span>)
          }
        </div>

        <div className='m-2 p-2 h-52 overflow-y-auto bg-white
            rounded border-solid border-[1px] border-gray-500/25 shadow-md w-1/2'>
          {
            modelTokens.map((modelToken, index) =>
              <span
                style={{
                  backgroundColor: modelToken.isSegment &&
                  (selectedModelToken.segmentIndex == index ||
                    selectedStudentToken.mappedSegments.includes(modelToken.segmentIndex))
                    ? (modelToken.mappedSegments.length > 0?
                      defaultBackgroundColor : EmptySegmentBackgroundColor) : "white"
                }}
                onMouseEnter={() => {
                  setSelectedModelToken(modelToken);
                }}
                onMouseLeave={() => handleMouseLeave()}
              >
                {modelToken.token}
              </span>)
          }
        </div>
      </div>
    </div>
  );
};

export default InsightsViewer;
