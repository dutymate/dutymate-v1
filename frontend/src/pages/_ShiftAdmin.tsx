import Sidebar from "../components/organisms/WSidebar";
import MSidebar from "../components/organisms/MSidebar";
import ShiftAdminTable from "../components/organisms/ShiftAdminTable";
import RuleCheckList from "../components/organisms/RuleCheckList";
import HistoryList from "../components/organisms/HistoryList";
import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import useUserAuthStore from "../store/userAuthStore";
import { dutyService } from "../services/dutyService";
import type { DutyInfo } from "../services/dutyService";

const DutyManagement = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { userInfo } = useUserAuthStore();
	const [dutyInfo, setDutyInfo] = useState<DutyInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchDutyInfo = async (
		year?: number,
		month?: number,
		historyIdx?: number,
	) => {
		try {
			setLoading(true);
			const params: Record<string, any> = {};
			if (year) params.year = year;
			if (month) params.month = month;
			if (typeof historyIdx === "number") params.history = historyIdx;

			const data = await dutyService.getDuty(
				Object.keys(params).length > 0 ? params : undefined,
			);
			setDutyInfo(data);
			setError(null);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to fetch duty info",
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDutyInfo();
	}, []);

	if (loading) return <div>Loading...</div>;
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
					/>
					<div className="flex flex-col lg:flex-row gap-4">
						<RuleCheckList issues={dutyInfo.issues} />
						<HistoryList
							histories={dutyInfo.history}
							onRevert={(historyIdx) =>
								fetchDutyInfo(undefined, undefined, historyIdx)
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DutyManagement;
