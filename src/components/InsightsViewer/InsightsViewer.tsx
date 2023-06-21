import { useState } from "react";
import { ListModelTokens, ListStudentTokens } from "./InsightsViewerTypes";


const InsightsViewer = () => {
  const x = ["first text", "second text"];


  const [isHover, setIsHover] = useState<boolean[]>([false, false]);
  // const [studTokens] = useState<boolean[]>([]);
  // const [studModel] = useState<boolean[]>([]);
  // const [studTokens] = useState<boolean[]>([]);

  // const adj : ListStudentTokens = ["first text", "second text"];
  let adj = {"first": ["second"]};
  let studTokens = ["first","text"];
  let modelTokens = ["second","text"];
  const handleMouseEnter = (index: number) => {
    let newIsHover = [...isHover];
    newIsHover[index] = true;
    setIsHover(newIsHover);
  };

  const handleMouseLeave = (index: number) => {
    let newIsHover = [...isHover];
    newIsHover[index] = false;
    setIsHover(newIsHover);
  };

  return (
    <>
      <div>InsightsViewer</div>
      <div>
        {
          x.map((item, index) => <span className='m-2'
            style={{
              backgroundColor: isHover[index] ? "red" : "white"
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)} >
            {item}
          </span>)
        }</div>
    </>
  );
};

export default InsightsViewer;
