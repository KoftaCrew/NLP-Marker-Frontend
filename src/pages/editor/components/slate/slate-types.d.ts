import {
  Descendant,
  BaseEditor
} from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { PagedEditor } from './withPages';

/**
 * A top level element that contains all the elements in the document.
 */
export type Element =
    | PageElement
    | InPageElement

/**
 * Padding container.
 */
export interface PaddingProps {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

/**
 * A page element is a top-level element that contains all the elements on a page.
 */
export interface PageElement {
  type: 'page';
  children: InPageDescendant[];
  /**
   * The width of the page in points.
   */
  width: number;
  /**
   * The height of the page in points.
   */
  height: number;
  /**
   * The padding of the page in points.
   */
  padding: PaddingProps;
}

/**
 * A generic element that can be placed on a page.
 */
export type InPageElement =
    | BlockQuoteElement
    | BulletedListElement
    | HeadingElement
    | ImageElement
    | ParagraphElement
    | TableElement
    | TableCellElement
    | TableRowElement

/**
 * Any descendant that can be placed on a page.
 */
export type InPageDescendant = InPageElement | Text

/**
 * Generic element interface.
 */
export interface IInPageElement {
  type: string,
  /**
   * The alignment of the element.
   */
  align?: string,
  children: InPageDescendant[]
}

export interface BlockQuoteElement extends IInPageElement {
  type: 'block-quote'
}

export interface BulletedListElement extends IInPageElement {
  type: 'bulleted-list'
}

export interface HeadingElement extends IInPageElement {
  type: 'heading',
  /**
   * The level of the heading.
   */
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export interface ImageElement extends IInPageElement {
  type: 'image'
  /**
   * The URL of the image.
   */
  url: string
  children: EmptyText[]
}

export interface ParagraphElement extends IInPageElement {
  type: 'paragraph'
}

export interface TableElement extends IInPageElement {
  type: 'table';
  children: TableRowElement[]
}

export interface TableCellElement extends IInPageElement {
  type: 'table-cell';
  children: Text[]
  }

export interface TableRowElement extends IInPageElement {
  type: 'table-row';
  children: TableCellElement[]
}

export interface Text {
  text: string
  bold?: boolean
  italic?: boolean
  code?: boolean
}

export interface EmptyText {
  text: "",
  bold?: false,
  italic?: false,
  code?: false
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor & PagedEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: Element
    Text: Text | EmptyText
  }
}

declare global {
  interface Window {
    doc: Descendant[]
  }
}

export type ElementAttributes = {
  'data-slate-node': 'element';
  'data-slate-inline'?: true;
  'data-slate-void'?: true;
  dir?: 'rtl';
}
