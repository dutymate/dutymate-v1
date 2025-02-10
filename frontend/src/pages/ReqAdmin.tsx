import Sidebar from "../components/organisms/WSidebar";
import MSidebar from "../components/organisms/MSidebar";
import Title from "../components/atoms/Title";
import ReqAdminTable from "../components/organisms/ReqAdminTable";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import useUserAuthStore from "@/store/userAuthStore";

const ReqAdmin = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { userInfo } = useUserAuthStore();

	return (
		<div className="w-full min-h-screen flex flex-row bg-[#F4F4F4]">
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
					title="요청 근무 관리"
					subtitle="간호사들의 근무 요청을 관리해보세요"
				/>
				<div className="mt-3">
					<ReqAdminTable />
				</div>
			</div>
		</div>
	);
};

export default ReqAdmin;
