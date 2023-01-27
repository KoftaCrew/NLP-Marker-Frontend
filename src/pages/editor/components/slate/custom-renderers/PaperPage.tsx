import React from "react";
import { ElementAttributes, PaddingProps } from "../slate-types";

interface PaperPageProps {
  children: React.ReactNode[];
  width: number;
  height: number;
  padding?: PaddingProps;
}

const PaperPage = React.forwardRef<HTMLDivElement, PaperPageProps & ElementAttributes>(
  ({ children, width, height, padding, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className='bg-white shadow-md m-5'
        style={{
          width: `${width}pt`,
          height: `${height}pt`,
          padding: `${padding?.top || 0}pt ${padding?.right || 0}pt ${padding?.bottom || 0}pt ${padding?.left || 0}pt`
        }}>
        {children}
      </div>
    );
  }
);

export default PaperPage;
