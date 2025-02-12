import Sidebar from "../components/organisms/WSidebar";
import MSidebar from "../components/organisms/MSidebar";
import ShiftAdminTable from "../components/organisms/ShiftAdminTable";
import RuleCheckList from "../components/organisms/RuleCheckList";
import HistoryList from "../components/organisms/HistoryList";
import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import useUserAuthStore from "../store/userAuthStore";
import useShiftStore from "../store/shiftStore";

const DutyManagement = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { userInfo } = useUserAuthStore();
	const { dutyInfo, loading, error, fetchDutyInfo } = useShiftStore();

	useEffect(() => {
		fetchDutyInfo();
	}, []);

	if (loading && !dutyInfo) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!dutyInfo) return null;

	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
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
			<div className="flex-1 min-w-0 px-4 lg:px-8 py-6 h-[calc(100vh-1rem)] lg:h-screen overflow-y-auto">
				{/* 모바일 메뉴 버튼 */}
				<button
					onClick={() => setIsSidebarOpen(true)}
					className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg"
				>
					<IoMdMenu className="w-6 h-6 text-gray-600" />
				</button>

				<div className="flex flex-col gap-3 pb-8">
					<ShiftAdminTable
						dutyData={dutyInfo.duty}
						invalidCnt={dutyInfo.invalidCnt}
						year={dutyInfo.year}
						month={dutyInfo.month}
						onUpdate={fetchDutyInfo}
						issues={dutyInfo.issues}
					/>
					<div className="flex flex-col lg:flex-row gap-4 w-full">
						<RuleCheckList />
						<HistoryList />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DutyManagement;
