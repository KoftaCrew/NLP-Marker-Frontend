import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { selectOpenFile, OpenFileState } from '../../store/OpenFileSlice';
import EditorTabs from './components/EditorTabs';
import Header from './components/Header';
import PaperEditor from './components/PaperEditor';
import withPages from './components/slate/withPages';

const Editor = () => {
  const {data} = useSelector(selectOpenFile) as OpenFileState;

  const editor = useMemo(() =>
    withReact(
      withHistory(
        withPages(
          createEditor(),
          data.editor
        )
      )
    )
  , []);

  return (
    <div className='h-screen flex flex-col'>
      <Header />

      <EditorTabs editor={editor}/>

      <PaperEditor editor={editor}/>
    </div>
  );
};

export default Editor;
