import { ModelAnswerSegment } from "../entities/ModelAnswerTypes";

const segmentModelAnswer = async (modelAnswer: string) : Promise<ModelAnswerSegment[]> => {
  // TODO: Use api
  await new Promise((r) => setTimeout(r, 1000));
  const words = modelAnswer.split(" ");
  if (words.length === 0) return [];
  if (words.length === 1) return [{ start: 0, end: modelAnswer.length }];

  // As a mock, we will split the model answer into 2 segments
  const firstSegmentEnd = Math.floor(words.length / 2);
  const firstSegment = words.slice(0, firstSegmentEnd).join(" ");

  return [
    { start: 0, end: firstSegment.length },
    { start: firstSegment.length + 1, end: modelAnswer.length }
  ];
};

export { segmentModelAnswer };
