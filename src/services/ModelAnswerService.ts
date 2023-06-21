import { ModelAnswerSegment } from "../entities/ModelAnswerTypes";

const segmentModelAnswer = async (modelAnswer: string) : Promise<ModelAnswerSegment[]> => {
  // TODO: Use api
  await new Promise((r) => setTimeout(r, 1000));
  if (modelAnswer.length === 0) return [];
  if (modelAnswer.length === 1) return [{ start: 0, end: 1 }];

  return [
    {
      start: 0,
      end: Math.floor(modelAnswer.length / 2)
    },
    {
      start: Math.floor(modelAnswer.length / 2),
      end: modelAnswer.length
    }
  ];
};

export { segmentModelAnswer };
