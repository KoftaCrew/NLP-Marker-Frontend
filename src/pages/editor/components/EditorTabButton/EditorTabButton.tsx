import {Editor, Transforms} from "slate";
import {InPageElement} from "../slate/slate-types";

interface EditorTabButtonProps {
  type: InPageElement["type"]
  children: React.ReactNode;
  editor: Editor;
}
const EditorTabButton = ({type, children, editor}: EditorTabButtonProps) => {
  return (
    <button
      className='hover:bg-black/20 text-black  py-2 px-4  mx-1'
      onClick={() => {
        Transforms.setNodes(
          editor,
          {type: type},
          {match: (n) => Editor.isBlock(editor, n)}
        );
      }}
    >
      {children}
    </button>
  );
};

export default EditorTabButton;
