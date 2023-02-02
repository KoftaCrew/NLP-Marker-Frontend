import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import FileMetaData from '../data/FileMetaData';
import { RootState } from './Store';
import { Nullable } from '../utils/Types';
import { POINTS_TO_INCH } from '../constants';
import { PagedEditor } from '../pages/editor/components/slate/withPages';
import { Descendant } from 'slate';

export interface OpenFileState {
  fileMetaData: FileMetaData;
  data: {
    editor: PagedEditor,
    content: Descendant[]
  };
}

const initialState = null as Nullable<OpenFileState>;

export const openFileSlice = createSlice({
  name: 'openFile',
  initialState,
  reducers: {
    openFile: (_, action: PayloadAction<FileMetaData>) => {
      return {
        fileMetaData: action.payload,
        // TODO remove placeholder data
        data: {
          editor: {
            width: 8.3 * POINTS_TO_INCH,
            height: 11.7 * POINTS_TO_INCH,
            padding: {
              top: POINTS_TO_INCH,
              bottom: POINTS_TO_INCH,
              left: POINTS_TO_INCH,
              right: POINTS_TO_INCH
            }
          },
          content: [
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
          ]
        }
      };
    },
    setFileContent: (state, action: PayloadAction<Descendant[]>) => {
      if (state) {
        state.data.content = action.payload;
        window.doc = action.payload;
      }
    },
    closeFile: () => {
      return initialState;
    }
  }
});

export const { openFile, closeFile, setFileContent } = openFileSlice.actions;

export const selectOpenFile = (state: RootState) => state.openFile;

export default openFileSlice.reducer;
