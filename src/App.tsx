import React from 'react';
import { useSelector } from 'react-redux';

import When from './components/When';
import Editor from './pages/editor/Editor';
import HomePage from './pages/home-page/HomePage';
import { selectOpenFile } from './store/OpenFileSlice';

function App() {
  const openFileSelector = useSelector(selectOpenFile);

  return (
    <>
      <When
        isTrue={openFileSelector === null}>
        <HomePage />
      </When>
      <When
        isTrue={openFileSelector !== null}>
        <Editor />
      </When>
    </>
  );
}

export default App;
