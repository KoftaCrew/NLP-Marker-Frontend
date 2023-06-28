import { InputBaseComponentProps } from "@mui/material";

export interface CustomInputProps extends InputBaseComponentProps {
  segments?: ModelAnswerSegment[];
  setSegments?: (segments: ModelAnswerSegment[]) => void;
}

export interface ModelAnswerSegmenterProps {
  modelAnswer?: string;
  setModelAnswer?: (modelAnswer: string) => void;
  segments?: ModelAnswerSegment[];
  setSegments?: (segments: ModelAnswerSegment[]) => void;
  rows?: number;
  mode?: "grade" | "edit";
  setMode?: (mode: "grade" | "edit") => void;
}
