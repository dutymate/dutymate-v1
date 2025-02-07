import Sidebar from "../components/organisms/WSidebar";
import MSidebar from "../components/organisms/MSidebar";
import Title from "../components/atoms/Title";
import WardAdminForm from "../components/organisms/WardAdminForm";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

const WardAdmin = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			{/* 데스크톱 Sidebar */}
			<div className="hidden lg:block w-[238px] shrink-0">
				<Sidebar userType="head" />
			</div>

			{/* 모바일 Sidebar */}
			<MSidebar
				userType="head"
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>

			{/* 메인 컨텐츠 영역 */}
			<div className="flex-1 min-w-0 px-4 lg:px-8 py-6 overflow-y-auto">
				{/* 모바일 메뉴 버튼 */}
				<button
					onClick={() => setIsSidebarOpen(true)}
					className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg"
				>
					<IoMdMenu className="w-6 h-6 text-gray-600" />
				</button>

				<div className="mb-3">
					<Title title="병동 관리" subtitle="병동의 간호사를 관리해보세요" />
				</div>
				<div className="mt-6">
					<WardAdminForm />
				</div>
			</div>
		</div>
	);
};

export default WardAdmin;
