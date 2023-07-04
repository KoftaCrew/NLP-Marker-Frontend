/* eslint-disable @typescript-eslint/no-explicit-any */
import { Question } from "../entities/Question";

export const QuestionsResultsSerializer = (questions: any) => {

  const serializedQuestions : Question[] = questions.answers.map((answer: any)=> ({
    title: answer.question.question,
    modelAnswer: {
      body: answer.question.model_answer.text,
      segments: answer.question.model_answer.model_answer_key_phrases.map((key: any)=> ({
        id: key.id,
        start: key.start_index,
        end: key.end_index,
        grade: key.grade
      }))
    },
    studentAnswer: {
      body: answer.text,
      segments: answer.answer_segments.map((key: any)=>({
        id: key.id,
        start: key.start_index,
        end: key.end_index,
        grade: key.grade,
        similarity: key.confidence,
        mappedSegment: key.key_phrase
      }))
    },
    grade: answer.total_grade
  }));

  return serializedQuestions;

};
