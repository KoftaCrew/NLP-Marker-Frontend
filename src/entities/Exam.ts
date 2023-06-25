export interface ExamModel {
  id: string;
  name: string;
  description?: string;
  mode: 'results' | 'editing';
}
