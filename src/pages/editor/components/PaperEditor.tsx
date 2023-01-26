import { useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";
import Element from "./slate/Element";

const PaperEditor = () => {
  const editor = useMemo(() =>
    withHistory(
      withReact(
        createEditor()
      )
    )
  , []);
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);

  return (
    <div className='flex flex-col items-center bg-gray-200 h-full overflow-y-auto'>
      <div>
        <Slate editor={editor} value={initialValue}>
          <Editable placeholder='hi' renderElement={renderElement}/>
        </Slate>
      </div>
    </div>
  );
};

const initialValue: Descendant[] = [
  {
    type: 'page',
    children: [
      {
        type: 'paragraph',
        children: [
          { text: 'This is editable plain text, just like a <textarea>!' }
        ]
      }
    ]
  }
];

export default PaperEditor;
