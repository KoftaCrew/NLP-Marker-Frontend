export type ModelAnswerSegment = {
  start: number;
  end: number;
  grade?: number;
  similarity?: number;
  mappedSegment?: number;
  id?: number;
}

export type ModelAnswer = {
  body: string;
  segments?: ModelAnswerSegment[];
  mode?: 'grade' | 'edit';
}

export type AnswerToken = {
  id: number;
  token: string;
  isSegment: boolean;
  mappedSegmentId: number[];
  grade: number;
  maxGrade?: number;
  similarity?: number;
}
