import {ElementAttributes, QuestionHeadingElement} from "../slate/slate-types";
import React from "react";

interface QuestionProps {
    attributes: ElementAttributes;
    children: React.ReactNode;
    element: QuestionHeadingElement;
}
const Question = ({attributes, children}: QuestionProps) => {
  return(
    <div {...attributes} className='bg-red-200'>{children}</div>
  );
};

export default Question;
