import { Question, StudentQuestion } from "./Question";

export interface ExamModel {
  id: number;
  name: string;
  description?: string;
  mode: 'results' | 'editing' | 'answering' | 'grading';
}

export interface Exam extends ExamModel{
  questions: Question[];
}

export interface StudentExam {
  id: number;
  name: string;
  questions: StudentQuestion[];
}
