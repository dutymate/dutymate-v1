import { useState } from "react";
import Sidebar from "../components/organisms/WSidebar";
import MSidebar from "../components/organisms/MSidebar";
import Title from "../components/atoms/Title";
import MypageProfile from "../components/organisms/MypageProfile";
import MypagePassword from "../components/organisms/MypagePassword";
import MypageExit from "../components/organisms/MypageExit";
import { IoMdMenu } from "react-icons/io";
import useUserAuthStore from "../store/userAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiErrorResponse, profileService } from "@/services/profileService";

const Mypage = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { userInfo } = useUserAuthStore();
	const navigate = useNavigate();
	const userAuthStore = useUserAuthStore();
	const handleLogoutButton = () => {
		profileService.logout(
			() => {
				userAuthStore.logout();
				navigate("/login");
			},
			(error: ApiErrorResponse) => {
				toast.error(error.message);
			},
		);

		navigate("/login");
	};

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
			<div className="flex-1 min-w-0 px-4 lg:px-8 py-6 overflow-y-auto">
				{/* 모바일 메뉴 버튼 */}
				<button
					onClick={() => setIsSidebarOpen(true)}
					className="lg:hidden mb-2 p-2 hover:bg-gray-100 rounded-lg"
				>
					<IoMdMenu className="w-6 h-6 text-gray-600" />
				</button>
				<div className="flex">
					<Title title="마이페이지" subtitle="나의 정보를 확인해보세요" />
					<button
						onClick={handleLogoutButton}
						className="w-full lg:w-[100px] px-3 py-2 bg-white text-gray-900 border border-gray-200 rounded-md hover:bg-gray-50 text-xs lg:text-sm h-[35px] ml-3"
					>
						로그아웃
					</button>
				</div>
				<div className="mt-4 flex justify-center">
					<div className="w-full lg:w-[1400px] space-y-4">
						<MypageProfile />
						<MypagePassword />
						<MypageExit />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Mypage;
