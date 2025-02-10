import Sidebar from "../components/organisms/WSidebar";
import MSidebar from "../components/organisms/MSidebar";
import Title from "../components/atoms/Title";
import ShiftAdminTable from "../components/organisms/ShiftAdminTable";
import HistoryList from "../components/organisms/HistoryList";
import RuleCheckList from "../components/organisms/RuleCheckList";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import useUserAuthStore from "../store/userAuthStore";

const ShiftAdmin = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { userInfo } = useUserAuthStore();

	return (
		<div className="w-full min-h-screen flex flex-row bg-[#F4F4F4]">
			{/* 데스크톱 Sidebar */}
			{/* 데스크톱 Sidebar */}
			<div className="hidden lg:block w-[238px] shrink-0">
				<Sidebar userType={userInfo?.role as "HN" | "RN"} />
			</div>

			{/* 모바일 Sidebar */}
			<MSidebar
				userType={userInfo?.role as "HN" | "RN"}
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>

			{/* 메인 컨텐츠 영역 */}
			<div className="flex-1 min-w-0 px-4 lg:px-8 py-3 overflow-y-auto pb-8">
				{/* 모바일 메뉴 버튼 */}
				<button
					onClick={() => setIsSidebarOpen(true)}
					className="lg:hidden mb-2 p-2 hover:bg-gray-100 rounded-lg"
				>
					<IoMdMenu className="w-6 h-6 text-gray-600" />
				</button>

				<Title
					title="근무표 관리"
					subtitle="간호사들의 근무표를 관리해보세요"
				/>

				{/* 히스토리와 규칙 체크 영역으로 변경 */}
				<div className="flex flex-col lg:flex-row gap-3">
					<div className="w-full lg:w-1/2">
						<HistoryList />
					</div>
					<div className="w-full lg:w-1/2">
						<RuleCheckList />
					</div>
				</div>

				<div className="mt-3 flex flex-col gap-3">
					<ShiftAdminTable />
				</div>
			</div>
		</div>
	);
};

export default ShiftAdmin;
