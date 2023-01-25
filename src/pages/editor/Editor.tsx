import EditorTabs from './components/EditorTabs';
import Header from './components/Header';
import PaperEditor from './components/PaperEditor';

const Editor = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Header />

      <EditorTabs/>

      <PaperEditor/>
    </div>
  );
};

export default Editor;
