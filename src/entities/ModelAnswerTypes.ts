export type ModelAnswerSegment = {
  start: number;
  end: number;
  grade?: number;
}

export type ModelAnswer = {
  body: string;
  segments?: ModelAnswerSegment[];
  mode?: 'grade' | 'edit';
}

export type AnswerToken = {
  token: string;
  isSegment: boolean;
  mappedSegments: number[];
  segmentIndex: number;
}
