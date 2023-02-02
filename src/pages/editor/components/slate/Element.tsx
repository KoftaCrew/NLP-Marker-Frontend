import { RenderElementProps } from "slate-react";
import PaperPage from "./custom-renderers/PaperPage";
import Question from "../Question/Question";

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
  case 'page':
    return (
      <PaperPage
        {...element}
        {...attributes}>
        {children}
      </PaperPage>
    );
  case 'mcq':
  case 'math':
  case 'compare':
  case 'true-false':
  case 'essay':
    return (
      <Question attributes={attributes} element={element}>{children}</Question>
    );
  default:
    return <p {...attributes}>{children}</p>;
  }
};

export default Element;
