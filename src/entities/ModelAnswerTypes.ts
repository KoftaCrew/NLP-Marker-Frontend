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