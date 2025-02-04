import React from "react";

interface TitleProps {
  title: string;
  subtitle: string;
}

const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col max-w-[68.75rem] mx-auto w-full">
      {/* 제목과 선을 같은 라인에서 정렬 */}
      <div className="flex items-center w-full">
        <h1 className="text-2xl font-bold text-base-foreground whitespace-nowrap">{title}</h1>
        <div className="flex-1 border-b border-gray-300 ml-4"></div>
      </div>
      {/* 부제목을 제목과 동일한 시작점에서 정렬 */}
      <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default Title;
