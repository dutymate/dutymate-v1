import useUserAuthStore from "@/store/userAuthStore";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import Title from "../atoms/Title";
import Sidebar from "./WSidebar";
import MSidebar from "./MSidebar";
import CommunityNews from "./CommunityNews";

const CommunityLayout = ({ title, subtitle, children }: any) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { userInfo } = useUserAuthStore();

	return (
		<div className="w-full min-h-screen flex flex-row bg-[#F4F4F4]">
			{/* 데스크톱 Sidebar */}
			<div className="hidden lg:block w-[14.875rem] shrink-0">
				<Sidebar userType={userInfo?.role as "HN" | "RN"} />
			</div>

			{/* 모바일 Sidebar */}
			<MSidebar
				userType={userInfo?.role as "HN" | "RN"}
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>

			{/* 메인 컨텐츠 영역 */}
			<div className="flex-1 min-w-0 px-4 lg:px-8 py-6 h-[calc(100vh-1rem)] lg:h-screen overflow-y-auto lg:overflow-x-hidden">
				{/* 모바일 메뉴 버튼 */}
				<button
					onClick={() => setIsSidebarOpen(true)}
					className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg"
				>
					<IoMdMenu className="w-6 h-6 text-gray-600" />
				</button>
				<Title title={title} subtitle={subtitle} />

				{/* 컨텐츠와 뉴스 영역 */}
				<div className="mt-6 flex gap-6">
					{/* 메인 컨텐츠 */}
					<div className="flex-1 min-w-0">{children}</div>
					{/* 뉴스 영역 */}
					<div className="hidden lg:block w-[22rem] shrink-0">
						<CommunityNews />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommunityLayout;
