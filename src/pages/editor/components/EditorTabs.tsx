import { Tab } from '@headlessui/react';

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

const EditorTabs = () => {
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
          Content 1
        </EditorTabPanel>
        <EditorTabPanel>
          Content 2
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
