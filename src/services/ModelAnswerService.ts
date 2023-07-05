import { ModelAnswerSegment } from "../entities/ModelAnswerTypes";
import axiosInstance from "./AxiosService";

const segmentModelAnswer = async (modelAnswer: string) : Promise<ModelAnswerSegment[]> => {
  const response = await axiosInstance.post("/exam/smart-segmentation/",
    {
      answer: modelAnswer
    });

  return response.data.segments.map((segment: number[]) => {
    return {
      start: segment[0],
      end: segment[1]
    };
  });
};

export { segmentModelAnswer };
