import { ModelAnswer } from "./ModelAnswerTypes";

export interface Question {
  title: string;
  modelAnswer: ModelAnswer;
}

export interface StudentQuestion {
  title: string;
  studentAnswer: string;
}