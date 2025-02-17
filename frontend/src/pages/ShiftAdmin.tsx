import Sidebar from "../components/organisms/WSidebar";
import MSidebar from "../components/organisms/MSidebar";
import ShiftAdminTable from "../components/organisms/ShiftAdminTable";
import RuleCheckList from "../components/organisms/RuleCheckList";
import HistoryList from "../components/organisms/HistoryList";
import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import useUserAuthStore from "../store/userAuthStore";
import useShiftStore from "../store/shiftStore";
import PageLoadingSpinner from "@/components/atoms/Loadingspinner";
import { useNavigate } from "react-router-dom";

const DutyManagement = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [showMobileModal, setShowMobileModal] = useState(false);
	const { userInfo } = useUserAuthStore();
	const navigate = useNavigate();
	const { dutyInfo, loading, error, fetchDutyInfo } = useShiftStore();

	useEffect(() => {
		// URL에서 year와 month 파라미터 가져오기
		const url = new URL(window.location.href);
		const urlYear = url.searchParams.get("year");
		const urlMonth = url.searchParams.get("month");

		// year가 2000-2099 범위를 벗어나거나 유효하지 않은 숫자인 경우
		if (urlYear) {
			const yearNum = parseInt(urlYear);
			if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2099) {
				window.location.href = "/error";
				return;
			}
		}

		// month가 1-12 범위를 벗어나거나 유효하지 않은 숫자인 경우
		if (urlMonth) {
			const monthNum = parseInt(urlMonth);
			if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
				window.location.href = "/error";
				return;
			}
		}

		// URL에 파라미터가 있으면 해당 값으로, 없으면 undefined로 호출
		fetchDutyInfo(
			urlYear ? parseInt(urlYear) : undefined,
			urlMonth ? parseInt(urlMonth) : undefined,
		);
	}, []);

	useEffect(() => {
		const checkScreenSize = () => {
			if (window.innerWidth < 1024) {
				// lg 브레이크포인트
				setShowMobileModal(true);
			} else {
				setShowMobileModal(false);
			}
		};

		// 초기 체크
		checkScreenSize();

		// 리사이즈 이벤트 리스너
		window.addEventListener("resize", checkScreenSize);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	if (loading && !dutyInfo) {
		return <PageLoadingSpinner />;
	}
	if (error) return <div>Error: {error}</div>;
	if (!dutyInfo) return null;

	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			{/* 모바일 안내 모달 */}
			{showMobileModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg p-6 max-w-sm w-full">
						<h2 className="text-xl text-center font-bold mb-4">알림</h2>
						<p className="text-gray-600 mb-6 text-center">
							듀티표 관리는 웹 버전에서만 확인 가능합니다.
							<br /> 병동 듀티표로 이동됩니다.
						</p>
						<button
							onClick={() => navigate(-1)}
							className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
						>
							확인
						</button>
					</div>
				</div>
			)}

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
			<div className="flex-1 min-w-0 px-[1rem] lg:px-[2rem] py-[1.5rem] h-[calc(100vh-1rem)] lg:h-screen overflow-y-auto">
				{/* 모바일 메뉴 버튼 */}
				<button
					onClick={() => setIsSidebarOpen(true)}
					className="lg:hidden mb-[1rem] p-[0.5rem] hover:bg-gray-100 rounded-lg"
				>
					<IoMdMenu className="w-6 h-6 text-gray-600" />
				</button>

				<div className="flex flex-col gap-[0.75rem] pb-[2rem]">
					<ShiftAdminTable
						dutyData={dutyInfo.duty}
						invalidCnt={dutyInfo.invalidCnt}
						year={dutyInfo.year}
						month={dutyInfo.month}
						onUpdate={fetchDutyInfo}
						issues={dutyInfo.issues}
					/>
					<div className="flex flex-col lg:flex-row gap-[1rem] w-full">
						<RuleCheckList />
						<HistoryList />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DutyManagement;
