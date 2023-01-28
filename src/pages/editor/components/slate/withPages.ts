import { Editor, Node, Element, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { PaddingProps, PageElement } from "./slate-types";

export interface PagedEditor {
  height: number;
  width: number;
  padding?: PaddingProps;
}

const withPages = (editor: Editor, options: PagedEditor): Editor => {
  editor.width = options.width;
  editor.height = options.height;
  editor.padding = options.padding || { left: 0, right: 0, top: 0, bottom: 0 };
  const { normalizeNode, width, height, padding } = editor;

  editor.normalizeNode = entry => {
    const [node, path] = entry;

    // Enforce all elements in the editor to be wrapped in a page element.
    if (Editor.isEditor(node)) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (Element.isElement(child)) {
          if (child.type !== "page") {
            Transforms.wrapNodes(
              editor,
              {
                type: "page",
                children: [],
                height: height,
                width: width,
                padding: padding
              }, { at: childPath }
            );
            return normalizeNode(entry);
          }
        }
      }
    }

    if (Element.isElement(node) && node.type === "page") {
      if (node.width !== width) {
        Transforms.setNodes(
          editor,
          { width: width },
          { at: path }
        );
        return normalizeNode(entry);
      }

      if (node.height !== height) {
        Transforms.setNodes(
          editor,
          { height: height },
          { at: path }
        );
        return normalizeNode(entry);
      }

      let renderedNode;
      // Fail if not rendered.
      try {
        renderedNode = ReactEditor.toDOMNode(editor, node);
      }
      catch (e) {
        return;
      }
      const style = window.getComputedStyle(renderedNode);
      const computedHeight = renderedNode.offsetHeight;
      const pagePadding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

      const renderedNodeHeight = computedHeight - pagePadding;

      let childrenHeight = 0;
      for (const [child] of Node.children(editor, path)) {
        if (Element.isElement(child)) {
          try{
            const renderedChild = ReactEditor.toDOMNode(editor, child);

            const renderedChildHeight = renderedChild.offsetHeight;
            childrenHeight += renderedChildHeight;
          } catch (e) { /* Skip if not rendered */ }
        }
      }

      if (childrenHeight > renderedNodeHeight) {
        const newPage: PageElement = {
          type: "page",
          children: [],
          height: height,
          width: width,
          padding: padding
        };

        Transforms.liftNodes(editor);
        Transforms.splitNodes(editor);
        Transforms.wrapNodes(editor, newPage);
        return;
      }
    }

    return normalizeNode(entry);
  };

  return editor;
};

export default withPages;
