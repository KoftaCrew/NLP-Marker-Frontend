import React from "react";

interface HomePageNavProps {
    title: string;
    children: React.ReactNode;
}

const HomePageNav = ({ title, children }: HomePageNavProps) => {
  return (
    <div className='w-fit bg-blue-900'>
      <h1 className='text-white text-4xl m-6 mb-10'>
        {title}
      </h1>

      {children}
    </div>
  );
};

export default HomePageNav;
