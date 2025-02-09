import Sidebar from "../components/organisms/WSidebar";
import MSidebar from "../components/organisms/MSidebar";
import Title from "../components/atoms/Title";
import ShiftAdminTable from "../components/organisms/ShiftAdminTable";
import HistoryList from "../components/organisms/HistoryList";
import WardAdminForm from "../components/organisms/WardAdminForm";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

const ShiftAdmin = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="w-full min-h-screen flex flex-row bg-[#F4F4F4]">
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

				{/* 근무표와 히스토리 영역 */}
				<div className="mt-3 flex flex-col gap-3">
					{/* 근무표 */}
					<ShiftAdminTable />

					{/* 히스토리와 병동 관리 영역 */}
					<div className="flex flex-col lg:flex-row gap-3">
						<div className="w-full lg:w-1/2">
							<HistoryList />
						</div>
						<div className="w-full lg:w-1/2">
							<WardAdminForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShiftAdmin;
