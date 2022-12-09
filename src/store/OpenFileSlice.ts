import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import FileMetaData from '../data/FileMetaData';
import { RootState } from './Store';
import { Nullable } from '../utils/Types';
import { ExamData } from '../data/ExamData';

export interface OpenFileState {
  fileMetaData: FileMetaData;
  data: ExamData;
}

const initialState = null as Nullable<OpenFileState>;

export const openFileSlice = createSlice({
  name: 'openFile',
  initialState,
  reducers: {
    openFile: (_, action: PayloadAction<FileMetaData>) => {
      return {
        fileMetaData: action.payload,
        data: {
          width: 8.3 * 72,
          aspectRatio: 8.3 / 11.7,
          questions: [{question: 'test', modelAnswer: '', answers: []}]
        }
      };
    },
    closeFile: () => {
      return initialState;
    }
  }
});

export const { openFile, closeFile } = openFileSlice.actions;

export const selectOpenFile = (state: RootState) => state.openFile;

export default openFileSlice.reducer;
