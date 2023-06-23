import { useState } from "react";
import { InsightsViewerProps } from "./InsightsViewerTypes";


const InsightsViewer = (props: InsightsViewerProps) => {
  const space = " ";

  const [isHighlightedStudent, setIsHighlightedStudent] =
    useState<boolean[]>(Array(props.modelTokens.length).fill(false));
  const [isHighlightedModel, setIsHighlightedModel] =
    useState<boolean[]>(Array(props.modelTokens.length).fill(false));

  const handleMouseEnter = (index: number, tokenType: number) => {
    const newHighlightedStudent: boolean[] =
     Array(props.modelTokens.length).fill(false);
    const newHighlightedModel: boolean[] =
     Array(props.modelTokens.length).fill(false);

    if (tokenType == 0) {
      newHighlightedStudent[index] = true;
      for (let i = 0; i < props.adjStud[index].length; i++) {
        newHighlightedModel[i] = true;
      }
    }
    else {
      newHighlightedModel[index] = true;
      for (let i = 0; i < props.adjModel[index].length; i++) {
        newHighlightedStudent[i] = true;
      }
    }
    setIsHighlightedStudent(newHighlightedStudent);
    setIsHighlightedModel(newHighlightedModel);
  };

  const handleMouseLeave = () => {
    const newHighlighted: boolean[] = Array(props.modelTokens.length);
    newHighlighted.fill(false);
    setIsHighlightedStudent(newHighlighted);
    setIsHighlightedModel(newHighlighted);
  };


  return (
    <>
      <div>InsightsViewer</div>
      <span className='m-2'>
        {
          props.studTokens.map((item, index) => <span className=''
            style={{
              backgroundColor: isHighlightedStudent[index] ? "red" : "white"
            }}
            onMouseEnter={() => handleMouseEnter(index, 0)}
            onMouseLeave={() => handleMouseLeave()} >
            {item}
            <span style={{ backgroundColor: "white" }}>{space}</span>
          </span>)
        }</span>
      <span className='m-2'>
        {
          props.modelTokens.map((item, index) => <span className=''
            style={{
              backgroundColor: isHighlightedModel[index] ? "red" : "white"
            }}
            onMouseEnter={() => handleMouseEnter(index, 1)}
            onMouseLeave={() => handleMouseLeave()} >
            {item}
            <span style={{ backgroundColor: "white" }}>{space}</span>
          </span>)
        }
      </span>
    </>
  );
};

export default InsightsViewer;
