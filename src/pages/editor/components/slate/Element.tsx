import { RenderElementProps } from "slate-react";
import PaperPage from "../PaperPage";

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
  case 'page':
    return <PaperPage>{children}</PaperPage>;
  default:
    return <p {...attributes}>{children}</p>;
  }
};

export default Element;
