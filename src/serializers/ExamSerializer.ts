/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { Exam } from "../entities/Exam";

export const ExamModeSerializer = (mode: number) => {
  switch (mode) {
  case 0:
  case 1:
    return 'editing';
  case 2:
    return 'results';
  case 3:
    return 'answering';
  case 4:
    return 'grading';
  default:
    return 'editing';
  }
};

export const ExamCardSerializer = (exam: any) => ({
  id: exam.id as number,
  name: exam.name as string,
  mode: ExamModeSerializer(exam.mode) as 'editing' | 'results' | 'answering'
});

export const ExamSerializer = (exam: any) => {
  const serializedExam: Exam = {
    ...ExamCardSerializer(exam),
    questions: exam.exam_questions.map(((question: any) => ({
      title: question.question,
      modelAnswer: {
        body: question.model_answer.text,
        mode: 'grade',
        segments: question.model_answer.model_answer_key_phrases.map((segment: any) => ({
          start: segment.start_index,
          end: segment.end_index,
          grade: segment.grade
        }))
      }

    })))
  };
  return serializedExam;
};

export const ExamModeDeserializer = (mode: string) => {
  switch (mode) {
  case 'editing':
    return 1;
  case 'results':
    return 2;
  case 'answering':
    return 3;
  case 'grading':
    return 4;
  default:
    return 0;
  }
};

export const ExamDeserializer = (exam: Exam) => {
  const deserializedExam = {
    name: exam.name,
    mode: ExamModeDeserializer(exam.mode),
    exam_questions: exam.questions.map((question) => ({
      question: question.title,
      model_answer: {
        text: question.modelAnswer.body,
        model_answer_key_phrases: question.modelAnswer.segments?.map((segment) => ({
          start_index: segment.start,
          end_index: segment.end,
          grade: segment.grade
        }))
      }
    }))
  };

  return deserializedExam;
};
