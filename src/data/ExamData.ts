interface QuestionData {
  question: string;
  modelAnswer: string;
  answers: string[];
}

interface ExamData {
  width: number;
  aspectRatio: number;
  questions: QuestionData[];
}


export type { QuestionData, ExamData };
