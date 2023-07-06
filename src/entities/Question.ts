import { ModelAnswer } from "./ModelAnswerTypes";

export interface Question {
  title: string;
  modelAnswer: ModelAnswer;
  studentAnswer?: ModelAnswer;
  grade?: number;
}

export interface StudentQuestion {
  title: string;
  id: number;
  studentAnswer: string;
}