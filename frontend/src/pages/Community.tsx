import Sidebar from "../components/organisms/WSidebar";
import MSidebar from "../components/organisms/MSidebar";
import Title from "../components/atoms/Title";
import CommunityForm from "../components/organisms/CommunityForm";
import CommunityWrite from "../components/organisms/CommunityWrite";
import CommunityDetail from "../components/organisms/CommunityDetail";
import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import useUserAuthStore from "../store/userAuthStore";
import { useLocation, useNavigate } from "react-router-dom";

const Community = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { userInfo } = useUserAuthStore();
	const [isWriting, setIsWriting] = useState(false);
	const [selectedPost, setSelectedPost] = useState<any>(null);
	const location = useLocation();
	const navigate = useNavigate();

	// 사이드바 커뮤니티 메뉴 클릭 시 초기화
	useEffect(() => {
		if (location.pathname === "/community" && location.key) {
			// location.key로 새로운 네비게이션 확인
			setIsWriting(false);
			setSelectedPost(null);
		}
	}, [location]);

	// 브라우저 뒤로가기 처리
	useEffect(() => {
		const handlePopState = (event: PopStateEvent) => {
			event.preventDefault();
			if (isWriting || selectedPost) {
				setIsWriting(false);
				setSelectedPost(null);
				// 현재 URL을 /community로 교체
				navigate("/community", { replace: true });
			}
		};

		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, [isWriting, selectedPost, navigate]);

	// 게시글 클릭 핸들러
	const handlePostClick = (post: any) => {
		setSelectedPost(post);
		// 게시글 상태 변경 시 history 스택에 상태 추가
		window.history.pushState(null, "", "/community");
	};

	// 글쓰기 핸들러
	const handleWrite = () => {
		setIsWriting(true);
		// 글쓰기 상태 변경 시 history 스택에 상태 추가
		window.history.pushState(null, "", "/community");
	};

	// 뒤로가기 핸들러
	const handleBack = () => {
		setSelectedPost(null);
		setIsWriting(false);
	};

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
				{/* Title 영역 - width 제한 없음 */}
				<div className="px-4 lg:px-8 pt-6">
					{/* 모바일 메뉴 버튼 */}
					<button
						onClick={() => setIsSidebarOpen(true)}
						className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg"
					>
						<IoMdMenu className="w-6 h-6 text-gray-600" />
					</button>
					{!selectedPost && !isWriting ? (
						<Title title="커뮤니티" subtitle="동료들과 소통해보세요" />
					) : selectedPost ? (
						<Title title="게시글" subtitle="동료들의 이야기를 읽어보세요" />
					) : (
						<Title
							title="글쓰기"
							subtitle="동료들과 나누고 싶은 이야기를 작성해보세요"
						/>
					)}
				</div>

				{/* 컨텐츠 영역 - width 제한 있음 */}
				<div className="flex-1 flex justify-center mt-6 pb-6">
					<div className="w-full lg:w-[53rem] px-3 lg:px-8 overflow-y-auto -mt-2">
						{selectedPost ? (
							<div className="space-y-2">
								<button
									onClick={handleBack}
									className="text-gray-600 hover:text-gray-800 whitespace-nowrap -mb-2"
								>
									← 목록으로
								</button>
								<CommunityDetail post={selectedPost} />
							</div>
						) : isWriting ? (
							<div className="space-y-2">
								<button
									onClick={handleBack}
									className="text-gray-600 hover:text-gray-800 whitespace-nowrap -mb-2"
								>
									← 목록으로
								</button>
								<CommunityWrite />
							</div>
						) : (
							<CommunityForm
								onWrite={handleWrite}
								onPostClick={handlePostClick}
							/>
						)}
					</div>
					{/* 광고 배너 영역 - 데스크톱에서만 표시 */}
					<div
						className={`hidden lg:block w-[20rem] shrink-0 px-1 ${
							selectedPost || isWriting ? "mt-6" : "-mt-2"
						}`}
					>
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

export default Community;
