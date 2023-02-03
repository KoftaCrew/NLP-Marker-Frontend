import { Tab } from '@headlessui/react';
import { Editor, Transforms } from 'slate';
import {EditorComponentProps, InPageElement} from './slate/slate-types';
import EditorTabButton from "./EditorTabButton/EditorTabButton";

interface ChildrenProps {
  children: React.ReactNode;
}

const EditorTab = ({ children }: ChildrenProps) => {
  return (<Tab className='p-2 bg-white rounded-md rounded-b-none mt-2 ui-selected:bg-blue-700
                         ui-selected:text-white ui-selected:border-2 ui-selected:border-blue-700
                         focus-visible:outline-none transition ease-out hover:bg-blue-400 shadow-sm'>
    {children}
  </Tab>);
};

const EditorTabPanel = ({ children }: ChildrenProps) => {
  return (<Tab.Panel className='p-2 bg-white rounded-md rounded-t-none drop-shadow-md'>
    {children}
  </Tab.Panel>);
};

const EditorTabs = ({ editor }: EditorComponentProps) => {
  return (
    <Tab.Group>
      <Tab.List className='bg-gray-300 px-3 space-x-3 shadow-md'>
        <EditorTab>Home</EditorTab>
        <EditorTab>Insert</EditorTab>
        <EditorTab>Annotate</EditorTab>
        <EditorTab>Export</EditorTab>
      </Tab.List>
      <Tab.Panels className='bg-gray-300 pb-2 px-3 drop-shadow-md'>
        <EditorTabPanel>
          <EditorTabButton type={'block-quote'} editor={editor}>Convert to blockquote</EditorTabButton>

        </EditorTabPanel>
        <EditorTabPanel>
          {
            (["mcq", "true-false", "compare", "math", "essay"] as InPageElement["type"][]).map((type) => {
              return <EditorTabButton type={type} editor={editor}
              >
                {type[0].toUpperCase()}{type.substr(1)}</EditorTabButton>;
            })
          }
        </EditorTabPanel>
        <EditorTabPanel>
          Content 3
        </EditorTabPanel>
        <EditorTabPanel>
          Content 4
        </EditorTabPanel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default EditorTabs;
