import { Question, StudentQuestion } from "./Question";

export interface ExamModel {
  id: string;
  name: string;
  description?: string;
  mode: 'results' | 'editing';
}

export interface Exam extends ExamModel{
  questions: Question[];
}

export interface StudentExam {
  id: string;
  name: string;
  questions: StudentQuestion[];
}
