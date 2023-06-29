import { ReactComponentElement } from "react";

export type StudentAnswersProps = {
  examId: string;
};

export type StudentAnswer = {
  name: string;
  answers: {
    questionTitle: string,
    insights: ReactComponentElement<InsightsViewer>}[];
}

export type Student = {
  name: string;
  id: string;
}