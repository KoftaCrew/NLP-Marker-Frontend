import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Descendant } from "slate";
import { Editable, RenderElementProps, Slate } from "slate-react";
import { OpenFileState, selectOpenFile, setFileContent } from "../../../store/OpenFileSlice";
import Element from "./slate/Element";
import { EditorComponentProps } from "./slate/slate-types";

const PaperEditor = ({ editor }: EditorComponentProps) => {
  const {data} = useSelector(selectOpenFile) as OpenFileState;
  const dispatch = useDispatch();

  const setContent = useCallback((content: Descendant[]) => {
    dispatch(setFileContent(content));
  }, [dispatch]);

  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);

  return (
    <div className='flex flex-col items-center bg-gray-200 h-full overflow-y-auto'>
      <div>
        <Slate editor={editor} value={data.content} onChange={setContent}>
          <Editable renderElement={renderElement}/>
        </Slate>
      </div>
    </div>
  );
};

export default PaperEditor;
