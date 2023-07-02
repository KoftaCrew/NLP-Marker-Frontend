/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { Exam } from "../entities/Exam";

export const ExamSerializer = (exam: any) => {
  const serializedExam : Exam = {
    id: exam.id,
    name: exam.name,
    mode: exam.mode === 0? 'editing' : 'results',
    questions: exam.exam_questions.map(((question: any) => ({
      title: question.question,
      modelAnswer: {
        body: question.model_answer.text,
        mode: 'grade',
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


export const ExamDeserializer = (exam: Exam) => {
  const deserializedExam = {
    name: exam.name,
    mode: exam.mode === 'editing'? 0 : 1,
    exam_questions: exam.questions.map((question) => ({
      question: question.title,
      model_answer: {
        text: question.modelAnswer.body,
        model_answer_key_phrases: question.modelAnswer.segements?.map((segement)=> ({
          start_index: segement.start,
          end_index: segement.end,
          grade: segement.grade
        }))
      }
    }))
  };

  return deserializedExam;
};
