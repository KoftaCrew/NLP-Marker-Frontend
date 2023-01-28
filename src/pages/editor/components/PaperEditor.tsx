import { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";
import { POINTS_TO_INCH } from "../../../constants";
import Element from "./slate/Element";
import withPages from "./slate/withPages";

const PaperEditor = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  window.doc = value;

  const editor = useMemo(() =>
    withReact(
      withHistory(
        withPages(
          createEditor(),
          {
            width: 8.3 * POINTS_TO_INCH,
            height: 11.7 * POINTS_TO_INCH,
            padding: {
              top: POINTS_TO_INCH,
              bottom: POINTS_TO_INCH,
              left: POINTS_TO_INCH,
              right: POINTS_TO_INCH
            }
          }
        )
      )
    )
  , []);
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);

  return (
    <div className='flex flex-col items-center bg-gray-200 h-full overflow-y-auto'>
      <div>
        <Slate editor={editor} value={value} onChange={setValue}>
          <Editable placeholder='hi' renderElement={renderElement}/>
        </Slate>
      </div>
    </div>
  );
};

const initialValue: Descendant[] = [
  {
    type: 'page',
    width: 8.3 * POINTS_TO_INCH,
    height: 11.7 * POINTS_TO_INCH,
    padding: {
      top: POINTS_TO_INCH,
      bottom: POINTS_TO_INCH,
      left: POINTS_TO_INCH,
      right: POINTS_TO_INCH
    },
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
