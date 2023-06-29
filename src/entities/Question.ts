import { ModelAnswer } from "./ModelAnswerTypes";

export interface Question {
  title: string;
  modelAnswer: ModelAnswer;
  studentAnswer?: ModelAnswer;
  segementsMap?: number[][];
}

export interface StudentQuestion {
  title: string;
  studentAnswer: string;
}