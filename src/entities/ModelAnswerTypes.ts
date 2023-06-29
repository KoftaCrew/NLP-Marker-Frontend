export type ModelAnswerSegment = {
  start: number;
  end: number;
  grade?: number;
}

export type ModelAnswer = {
  body: string;
  segements?: ModelAnswerSegment[];
  mode?: 'grade' | 'edit';
}

export type AnswerToken = {
  token: string;
  isSegment: boolean;
  mappedSegments: number[];
  segmentIndex: number;
}