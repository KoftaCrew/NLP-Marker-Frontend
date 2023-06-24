import { ReactComponentElement } from "react";

export type StudentAnswersProps = {
  studentAnswers: StudentAnswer[]
};

export type StudentAnswer = {
  Name: string;
  Answer: ReactComponentElement<InsightsViewer>;
}