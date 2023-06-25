import { useMemo, useState } from "react";
import { InsightsViewerProps } from "./InsightsViewerTypes";
import CustomModal from "../CustomModal/CustomModal";

const space = " ";
const defaultBackgroundColor = "#b1dae7";


const InsightsViewer = (props: InsightsViewerProps) => {
  const adjModelParser = (adj: number[][]) => {
    const adjModel: number[][] = Array(props.modelTokens.length).fill([]);
    for (let i = 0; i < adj.length; i++) {
      for (let j = 0; j < adj[i].length; j++) {
        adjModel[adj[i][j]].push(adj[i][j]);
      }
    }
    return adjModel;
  };

  const adjModel: number[][] = adjModelParser(props.adj);

  //highlight related states
  const [idx, setIdx] = useState(-1);
  const [tokenType, setTokenType] = useState(-1);

  const isHighlightedModel = useMemo(() => {
    const newHighlightedModel: boolean[] =
      Array(props.modelTokens.length).fill(false);
    if (idx < 0) return newHighlightedModel;

    if (tokenType === 1) {
      newHighlightedModel[idx] = true;
      return newHighlightedModel;
    }
    const x = props.adj[idx];
    if (x == undefined) return newHighlightedModel;

    for (let i = 0; i < x.length; i++) {
      newHighlightedModel[x[i]] = true;
    }
    return newHighlightedModel;
  }, [idx, tokenType]);


  const isHighlightedStudent = useMemo(() => {
    const newHighlightedModel: boolean[] =
      Array(props.studTokens.length).fill(false);

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
    const newHighlighted: boolean[] = Array(props.modelTokens.length);
    newHighlighted.fill(false);
    setIdx(-1);
    setTokenType(-1);
  };

  //modal related states
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalGrading, setModalGrading] = useState("");

  const [openStud, setOpenStud] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const handleOpen = (key: string, index: number) => {
    key === "first" ? setOpenStud(true) : setOpenModel(true);
    // key === "first" ?
    //   setModalContent(props.studentInsights === undefined ? "No Insights available" : props.studentInsights[index]) :
    //   setModalContent(props.modelInsights === undefined ? "No Insights available" : props.modelInsights[index]);
    let modalContent = "";
    if (key === "first") {
      if (props.studentInsights === undefined) {
        modalContent += "No Insights available";
      } else {
        modalContent += props.studentInsights[index];
      }
      if (props.answerGrade === undefined) {
        setModalGrading("No Answer Grade available");
      }
      else {
        setModalGrading(props.answerGrade[index].toString());
      }
    } else {
      if (props.modelInsights === undefined) {
        modalContent += "No Insights available";
      } else {
        modalContent += props.modelInsights[index];
      }
      if (props.modelGrade === undefined) {
        setModalGrading("No Model Grade available");
      } else {
        setModalGrading(props.modelGrade[index].toString());
      }
    }
    setModalContent(modalContent);
  };

  const handleClose = () => {
    setOpenStud(false);
    setOpenModel(false);
    setModalContent("");
  };

  const testClick = (key: string, item: string, index: number) => {
    setModalTitle(item);
    handleOpen(key, index);
  };

  return (
    <>
      <CustomModal key='first' open={openStud !== openModel} handleClose={handleClose} title={modalTitle} content={modalContent} grading={modalGrading} />
      <div className='bg-gray-300 w-full'>
        <div className='text-center '>Insights Viewer</div>
        <div className='flex justify-evenly text-center mb-2'>
          <span className='w-1/2 '>
            <span className='bg-white px-4 py-2 rounded-lg border border-black'>
              Student Answer
            </span>
          </span>
          <span className='w-1/2'>
            <span className='bg-white px-4 py-2 rounded-lg border border-black'>
              Model Answer
            </span>
          </span>
        </div>
        <div className='flex justify-evenly'>
          <span className='m-2 p-2 bg-white rounded border-solid border-2 border-black w-1/2 text-center'>
            {
              props.studTokens.map((item, index) => <span className=''
                onMouseDown={() => {
                  testClick("first", item, index);
                }}
                style={{
                  backgroundColor: isHighlightedStudent[index] ? defaultBackgroundColor : "white"
                }}
                onMouseEnter={() => {
                  setIdx(index);
                  setTokenType(0);
                }}
                onMouseLeave={() => handleMouseLeave()}>

                <span>{item}</span>
                <span style={{ backgroundColor: "white" }}>{space}</span>
              </span>)
            }
          </span>

          <span className='m-2 p-2 bg-white rounded border-solid border-2 border-black w-1/2 text-center'>
            {
              props.modelTokens.map((item, index) => <span
                onMouseDown={() => {
                  testClick("second", item, index);
                }}
                style={{
                  backgroundColor: isHighlightedModel[index] ? defaultBackgroundColor : "white"
                }}
                onMouseEnter={() => {
                  setIdx(index);
                  setTokenType(1);
                }}
                onMouseLeave={() => handleMouseLeave()}>
                {item}
                <span style={{ backgroundColor: "white" }}>{space}</span>
              </span>)
            }
          </span>
        </div>
      </div>
    </>
  );
};

export default InsightsViewer;
