import {
  Descendant,
  BaseEditor
} from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { PagedEditor } from './withPages';

export type BlockQuoteElement = {
  type: 'block-quote'
  align?: string
  children: Descendant[]
}

export type BulletedListElement = {
  type: 'bulleted-list'
  align?: string
  children: Descendant[]
}

export type CheckListItemElement = {
  type: 'check-list-item'
  checked: boolean
  children: Descendant[]
}

export type EditableVoidElement = {
  type: 'editable-void'
  children: EmptyText[]
}

export type HeadingElement = {
  type: 'heading'
  align?: string
  children: Descendant[]
}

export type HeadingTwoElement = {
  type: 'heading-two'
  align?: string
  children: Descendant[]
}

export type ImageElement = {
  type: 'image'
  url: string
  children: EmptyText[]
}

export type LinkElement = { type: 'link'; url: string; children: Descendant[] }

export type ButtonElement = { type: 'button'; children: Descendant[] }

export type ListItemElement = { type: 'list-item'; children: Descendant[] }

export type ParagraphElement = {
  type: 'paragraph'
  align?: string
  children: Descendant[]
}

export type TableElement = { type: 'table'; children: TableRow[] }

export type TableCellElement = { type: 'table-cell'; children: CustomText[] }

export type TableRowElement = { type: 'table-row'; children: TableCell[] }

export type TitleElement = { type: 'title'; children: Descendant[] }

export type VideoElement = { type: 'video'; url: string; children: EmptyText[] }

export type PageElement = {
  type: 'page';
  children: Descendant[];
  width: number;
  height: number;
  padding: PaddingProps;
}

export type QuestionElement =
  | MultipleChoiceQuestionElement
  | MathQuestionElement
  | CompareQuestionElement
  | TrueFalseQuestionElement
  | EssayQuestionElement
  | AnswerAreaElement

export type MultipleChoiceQuestionElement = {
  type: 'mcq';
  children: Descendant[];
}

export type MathQuestionElement = {
  type: 'math';
  children: Descendant[];
}

export type CompareQuestionElement = {
  type: 'compare';
  children: Descendant[];
}

export type TrueFalseQuestionElement = {
  type: 'truefalse';
  children: Descendant[];
}

export type EssayQuestionElement = {
  type: 'essay';
  children: Descendant[];
}

export type AnswerAreaElement = {
  type: 'answer';
  children: Descendant[];
}

export interface PaddingProps {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingElement
  | HeadingTwoElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | ListItemElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement
  | PageElement
  | QuestionElement

export type CustomText = {
  bold?: boolean
  italic?: boolean
  code?: boolean
  text: string
}

export type EmptyText = {
  text: string
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor & PagedEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText | EmptyText
  }
}

declare global {
  interface Window {
    doc: Descendant[]
  }
}

interface ElementAttributes {
  'data-slate-node': 'element';
  'data-slate-inline'?: true;
  'data-slate-void'?: true;
  dir?: 'rtl';
}
