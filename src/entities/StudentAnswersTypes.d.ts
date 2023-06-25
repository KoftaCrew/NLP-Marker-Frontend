import { ReactComponentElement } from "react";

export type StudentAnswersProps = {
  examId: string;
};

export type StudentAnswer = {
  Name: string;
  Answer: ReactComponentElement<InsightsViewer>;
}
