import { useMemo, useState } from "react";
import { InsightsViewerProps } from "./InsightsViewerTypes";
import CustomModal from "../CustomModal/CustomModal";

const space = " ";
const defaultBackgroundColor = "#b1dae7";

const adjModelParser = (adj: number[][]) => {
  const adjModel: number[][] = [[]];
  for (let i = 0; i < adj.length; i++) {
    let idx = 0;
    for (let j = 0; j < adj[i].length; j++) {
      adjModel[adj[i][j]].push(i);
    }
  }
  return adjModel;
};

const InsightsViewer = (props: InsightsViewerProps) => {
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

  const [openStud, setOpenStud] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const handleOpen = (key: string) => {
    key === "first" ? setOpenStud(true) : setOpenModel(true);
  };

  const handleClose = () => {
    setOpenStud(false);
    setOpenModel(false);
  };

  const testClick = (key: string, item: string, index: number) => {
    setModalTitle(item);
    setModalContent(index.toString());
    handleOpen(key);
  };

  return (
    <>
      <CustomModal key='first' open={openStud} handleClose={handleClose} title={modalTitle} content={modalContent} />
      <div className='bg-gray-400 w-2/3'>
        <div className='text-center '>InsightsViewer</div>
        <div className='flex justify-evenly'>
          <span className='m-2 p-2 bg-white rounded border-solid border-2 border-black w-2/5 text-center'>
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

                {item}
                <span style={{ backgroundColor: "white" }}>{space}</span>
              </span>)
            }
          </span>

          <span className='m-2 p-2 bg-white rounded border-solid border-2 border-black w-2/5 text-center'>
            {
              props.modelTokens.map((item, index) => <span
                onMouseDown={() => {
                  testClick("first", item, index);
                }}
                style={{
                  backgroundColor: isHighlightedModel[index] ? defaultBackgroundColor : "white"
                }}
                onMouseEnter={() => {
                  setIdx(index);
                  setTokenType(1);
                }}
                onMouseLeave={() => handleMouseLeave()}>
                <CustomModal
                  key='second' open={openModel} handleClose={handleClose} title={item} content={index.toString()} />
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
