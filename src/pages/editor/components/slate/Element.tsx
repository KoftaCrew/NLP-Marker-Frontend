import { RenderElementProps } from "slate-react";
import PaperPage from "./custom-renderers/PaperPage";

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
  default:
    return <p {...attributes}>{children}</p>;
  }
};

export default Element;
