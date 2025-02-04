import { ReactNode } from "react";
import Sidebar from "../organisms/HNWSidebar"; // ✅ 올바른 경로

interface HNTemplateProps {
  children: ReactNode;
  sidebar?: ReactNode; // 사이드바를 props로 받을 수 있도록 추가
}

const HNTemplate = ({ children, sidebar = <Sidebar /> }: HNTemplateProps) => {
  return (
    <div className="w-full h-screen flex flex-row bg-primary-bg">
      {/* Sidebar 적용 */}
      <div className="w-[20%] min-w-[280px] max-w-[25%] h-full">



        {sidebar}
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col px-[2%]">
        <h1 className="text-3xl font-black text-primary-dark mb-6 p-4">
          HN Template Page
        </h1>
        {children}
      </div>
    </div>
  );
};

export default HNTemplate;
