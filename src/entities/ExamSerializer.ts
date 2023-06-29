import { Exam } from "./Exam";

export const ExamSerializer = (exam: any) => {
  const serializedExam : Exam = {
    id: exam.id,
    name: exam.name,
    mode: exam.mode === 0? 'editing' : 'results',
    questions: exam.exam_questions.map(((question: any) => ({
      title: question.question,
      modelAnswer: {
        body: question.model_answer.text,
        mode: 'edit',
        segements: question.model_answer.model_answer_key_phrases.map((segement : any) => ({
          start: segement.start_index,
          end: segement.end_index,
          grade: segement.grade
        }))
      }

    })))
  };
  return serializedExam;
};