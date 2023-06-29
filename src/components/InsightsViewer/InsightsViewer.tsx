import { useMemo, useState } from "react";
import { InsightsViewerProps } from "./InsightsViewerTypes";
import { deepCopy } from "../../utils/Utils";
import { ModelAnswerSegment } from "../../entities/ModelAnswerTypes";

const defaultBackgroundColor = "#b1dae7";

const bodyParser = (body: string, segments: ModelAnswerSegment[]) => {
  let last = 0;
  let resSegments = [] as string[];
  for (let char = 0; char < segments.length; ++char) {
    if (last < segments[char].start) {
      resSegments = [...resSegments, body.substring(last, segments[char].start)];
      last = char;
    }
    resSegments = [...resSegments, body.substring(segments[char].start, segments[char].end)];
    last = segments[char].end;
  }
  if (last != body.length) {
    resSegments = [...resSegments, body.substring(last, body.length)];
  }
  return resSegments;
};

const InsightsViewer = (props: InsightsViewerProps) => {

  const studentSegments = deepCopy(props.question?.studentAnswer?.segements?
    props.question.studentAnswer.segements: [])?.sort((a, b) => a.start - b.start);

  const studentTokens = bodyParser(props.question?.studentAnswer? props.question.studentAnswer.body: '',
    studentSegments? studentSegments:[]);

  const modelSegments = deepCopy(props.question?.modelAnswer?.segements?
    props.question.modelAnswer.segements: [])?.sort((a, b) => a.start - b.start);

  const modelTokens = bodyParser(props.question?.modelAnswer? props.question.modelAnswer.body: '',
    modelSegments? modelSegments:[]);

  const segmentsMap = props.question.segementsMap? props.question.segementsMap : [];

  const adjModel: number[][] = useMemo(() => {
    const adjModel: number[][] = [];

    for (let i = 0; i < modelTokens.length; i++) { //this is for javascript idiocy
      adjModel.push([]);
    }


    for (let i = 0; i < segmentsMap.length; i++) {
      for (let j = 0; j < segmentsMap[i].length; j++) {
        adjModel[segmentsMap[i][j]].push(i);
      }
    }
    return adjModel;
  }, [segmentsMap, modelTokens]);


  //highlight related states
  const [idx, setIdx] = useState(-1);
  const [tokenType, setTokenType] = useState(-1);

  const isHighlightedModel = useMemo(() => {
    const newHighlightedModel: boolean[] =
      Array(modelTokens.length).fill(false);
    if (idx < 0) return newHighlightedModel;

    if (tokenType === 1) {
      newHighlightedModel[idx] = true;
      return newHighlightedModel;
    }
    const x = segmentsMap[idx];
    if (x == undefined) return newHighlightedModel;

    for (let i = 0; i < x.length; i++) {
      newHighlightedModel[x[i]] = true;
    }
    return newHighlightedModel;
  }, [idx, tokenType]);


  const isHighlightedStudent = useMemo(() => {
    const newHighlightedModel: boolean[] =
      Array(studentTokens.length).fill(false);

    if (idx < 0) return newHighlightedModel;

    if (tokenType == 0) {
      newHighlightedModel[idx] = true;
      return newHighlightedModel;
    }
    const x = adjModel[idx];
    if (x == undefined) return newHighlightedModel;
    for (let i = 0; i < x.length; i++) {
      newHighlightedModel[x[i]] = true;
    }

    return newHighlightedModel;
  }, [idx, tokenType]);

  const handleMouseLeave = () => {

    setIdx(-1);
    setTokenType(-1);
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
            studentTokens.map((token, index) => <span className=''
              style={{
                backgroundColor: isHighlightedStudent[index] ? defaultBackgroundColor : "white"
              }}
              onMouseEnter={() => {
                setIdx(index);
                setTokenType(0);
              }}
              onMouseLeave={() => handleMouseLeave()}>

              <span>{token}</span>
            </span>)
          }
        </div>

        <div className='m-2 p-2 h-52 overflow-y-auto bg-white
            rounded border-solid border-[1px] border-gray-500/25 shadow-md w-1/2'>
          {
            modelTokens.map((token, index) => <span
              style={{
                backgroundColor: isHighlightedModel[index] ? defaultBackgroundColor : "white"
              }}
              onMouseEnter={() => {
                setIdx(index);
                setTokenType(1);
              }}
              onMouseLeave={() => handleMouseLeave()}>
              {token}
            </span>)
          }
        </div>
      </div>
    </div>
  );
};

export default InsightsViewer;
