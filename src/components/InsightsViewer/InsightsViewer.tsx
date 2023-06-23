import { useState } from "react";
import { InsightsViewerProps } from "./InsightsViewerTypes";


const InsightsViewer = (props: InsightsViewerProps) => {
  const space = " ";

  //isHover state used to render background color of tokens on mouse hover
  const [isHover, setIsHover] = useState<boolean[]>([]);

  // const adj : ListStudentTokens = ["first text", "second text"];
  // let adj = { "first": ["second"] }; //TODO to be used for mapping student tokens to model tokens


  const handleMouseEnter = (index: number) => {
    const newIsHover = [...isHover];
    newIsHover[index] = true;
    setIsHover(newIsHover);
  };

  const handleMouseLeave = (index: number) => {
    const newIsHover = [...isHover];
    newIsHover[index] = false;
    setIsHover(newIsHover);
  };

  return (
    <>
      <div>InsightsViewer</div>
      <span className='m-2'>
        {
          props.studTokens.map((item, index) => <span className=''
            style={{
              backgroundColor: isHover[index] ? "red" : "white"
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)} >
            {item}
            <span style={{backgroundColor: "white"}}>{space}</span>
          </span>)
        }</span>
      <span className='m-2'>
        {
          props.modelTokens.map((item, index) => <span className=''
            style={{
              backgroundColor: isHover[index] ? "red" : "white"
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)} >
            {item}
            <span style={{backgroundColor: "white"}}>{space}</span>
          </span>)
        }
      </span>
    </>
  );
};

export default InsightsViewer;
