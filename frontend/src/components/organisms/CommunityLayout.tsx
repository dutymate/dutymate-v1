import useUserAuthStore from "@/store/userAuthStore";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import Title from "../atoms/Title";
import Sidebar from "./WSidebar";
import MSidebar from "./MSidebar";

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
			<div className="flex-1 min-w-0 flex flex-col">
				{/* Title 영역 */}
				<div className="px-4 lg:px-8 pt-6">
					{/* 모바일 메뉴 버튼 */}
					<button
						onClick={() => setIsSidebarOpen(true)}
						className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg"
					>
						<IoMdMenu className="w-6 h-6 text-gray-600" />
					</button>
					<Title title={title} subtitle={subtitle} />
				</div>

				{/* 컨텐츠 영역 */}
				<div className="flex-1 flex justify-center mt-6 pb-6">
					<div className="w-full lg:w-[53rem] px-3 lg:px-8 overflow-y-auto -mt-2">
						{children}
					</div>
					{/* 광고 배너 영역 - 데스크톱에서만 표시 */}
					<div className={`hidden lg:block w-[20rem] shrink-0 px-1 `}>
						<div className="bg-white rounded-lg p-4 min-h-[37.5rem] sticky top-6 shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.1)]">
							<h2 className="text-gray-800 font-semibold mb-4 whitespace-nowrap">
								간호사 뉴스, 날씨
							</h2>
							<div className="space-y-4">
								<div className="h-[12.5rem] bg-gray-50 rounded-lg"></div>
								<div className="h-[12.5rem] bg-gray-50 rounded-lg"></div>
								<div className="h-[9.375rem] bg-gray-50 rounded-lg"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommunityLayout;
