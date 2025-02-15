import { useLocation } from "react-router-dom";
// import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import CommunityCategories from "./CommunityCategories";
import { useState, useEffect } from "react";
import { CommunityWriteButton } from "../atoms/Button";

interface CommunityFormProps {
	onWrite: () => void;
	onPostClick: (post: any) => void;
}

const CommunityForm = ({ onWrite, onPostClick }: CommunityFormProps) => {
	const [selectedCategory, setSelectedCategory] = useState("전체글");
	const location = useLocation();

	// 컴포넌트 마운트 시 상단으로 스크롤
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		// location이 변경될 때마다 카테고리를 기본값으로 리셋
		setSelectedCategory("전체글");
	}, [location.pathname]);

	const posts = [
		{
			id: 1,
			nickname: "참먹는간호사23",
			category: "간호지식 Q&A",
			timeAgo: "21시간 전",
			title: "수혈 시 생리식염수(Normal Saline)만 사용하는 이유는?",
			content:
				"안녕하세요! 😊 최근 병동에서 혈액 수혈을 준비하면서 궁금한 점이 생겼습니다. 혈액 수혈 시 생리식염수(NS)만 함께 사용할 수 있고, 링거액(Ringer's lactate) 같은 다른 수액은 사용하면 안 된다고...",
			likes: 5,
			comments: 5,
			views: 5,
		},
		{
			id: 2,
			nickname: "참먹는간호사23",
			category: "일상",
			timeAgo: "21시간 전",
			title: "동기들이랑 3년 차 기념 여행 다녀왔어요! ⛰️",
			content:
				"입사한 지 벌써 3년! 힘든 순간도 많았지만, 그래도 동기들이랑 같이 버틴 덕분에 여기까지 왔네요. 이번에 제주도 가서 푹 쉬고 왔어요! 🍊",
			likes: 5,
			comments: 5,
			views: 5,
		},
		{
			id: 3,
			nickname: "야근마스터",
			category: "이직 정보",
			timeAgo: "12시간 전",
			title: "대학병원 이직 준비 중인데 팁 있을까요?",
			content:
				"현재 종합병원에서 2년 차 근무 중인데 대학병원으로 이직을 준비하고 있어요! 면접 팁이나 경력 인정 관련해서 조언해주실 분 계신가요? 🤔",
			likes: 8,
			comments: 3,
			views: 12,
		},
		{
			id: 4,
			nickname: "메디컬러버",
			category: "간호지식 Q&A",
			timeAgo: "8시간 전",
			title: "수술 후 환자 관리 시 가장 중요한 점은?",
			content:
				"수술 후 회복기 환자를 돌보는 중인데, 가장 신경 써야 할 부분이 뭘까요? 감염 예방 외에도 중요한 관리 포인트가 있다면 알려주세요! 🙏",
			likes: 6,
			comments: 7,
			views: 20,
		},
		{
			id: 5,
			nickname: "커피중독간호사",
			category: "일상",
			timeAgo: "5시간 전",
			title: "야간 근무 후 피로 푸는 법 공유해요!",
			content:
				"야간 근무 끝나고 피로를 풀기 위해 다들 어떻게 하나요? 저는 스트레칭이랑 반신욕을 자주 하는데, 더 좋은 방법 있을까요? ☕",
			likes: 10,
			comments: 4,
			views: 15,
		},
	];

	// 선택된 카테고리의 게시글만 필터링
	const filteredPosts = posts.filter((post) =>
		selectedCategory === "전체글"
			? true
			: selectedCategory === "HOT"
				? true
				: post.category === selectedCategory,
	);

	// 빈 카테고리 메시지 표시 여부 확인
	const shouldShowEmptyMessage =
		selectedCategory !== "전체글" &&
		selectedCategory !== "HOT" &&
		filteredPosts.length === 0;

	// 추천 게시글 데이터
	const recommendedPosts = [
		{
			id: 2, // 실제 posts 배열의 게시글 id와 매칭
			title: "동기들이랑 3년 차 기념 여행...",
			isHighlighted: true,
		},
		{
			id: 1, // 실제 posts 배열의 게시글 id와 매칭
			title: "수혈이 난감해,,ㅜ",
			isHighlighted: false,
		},
	];

	// 추천 게시글 클릭 핸들러
	const handleRecommendedClick = (recommendedId: number) => {
		const post = posts.find((p) => p.id === recommendedId);
		if (post) {
			onPostClick(post);
		}
	};

	const handlePostClick = (post: any) => {
		onPostClick(post);
	};

	return (
		<>
			<div className="bg-white rounded-xl p-4 lg:p-6 shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.1)]">
				{/* 상단 버튼 영역 */}
				<div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0 mb-6">
					<div className="overflow-x-auto">
						<CommunityCategories
							onCategorySelect={setSelectedCategory}
							selectedCategory={selectedCategory}
						/>
					</div>
					<CommunityWriteButton onClick={onWrite} className="hidden lg:block" />
				</div>

				{/* 추천 게시글 영역 */}
				<div className="mb-6 p-4 border border-gray-200 rounded-lg">
					<div className="flex items-center gap-4">
						<h3 className="text-lg font-semibold whitespace-nowrap">
							추천 게시글
						</h3>
						<div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
							{recommendedPosts.map((recommended) => (
								<button
									key={recommended.id}
									onClick={() => handleRecommendedClick(recommended.id)}
									className={`px-2 py-1 rounded text-sm whitespace-nowrap cursor-pointer transition-colors ${
										recommended.isHighlighted
											? "bg-primary-10 text-primary-dark hover:bg-primary-20"
											: "bg-gray-100 text-gray-600 hover:bg-gray-200"
									}`}
								>
									{recommended.title}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* 게시글 목록 */}
				<div className="space-y-4">
					{shouldShowEmptyMessage ? (
						<div className="p-8 text-center text-gray-400 border border-gray-100 rounded-lg">
							이 카테고리에 첫 번째 글을 작성해보세요!
						</div>
					) : (
						filteredPosts.map((post) => (
							<div
								key={post.id}
								className="p-4 border border-gray-200 rounded-lg hover:border-primary-dark cursor-pointer transition-colors"
								onClick={() => handlePostClick(post)}
							>
								<div className="flex gap-4">
									<div className="flex-1">
										{/* 게시글 헤더 */}
										<div className="flex flex-wrap items-center gap-2 mb-2">
											<Icon name="user" size={20} className="text-gray-400" />
											<span className="font-medium text-sm">
												{post.nickname}
											</span>
											<span className="text-gray-400 text-sm">·</span>
											<span className="text-gray-600 text-sm">
												{post.category}
											</span>
											<span className="text-gray-400 text-sm">·</span>
											<span className="text-gray-400 text-sm">
												{post.timeAgo}
											</span>
										</div>

										{/* 게시글 내용 */}
										<h3 className="text-lg font-medium mb-2 break-words">
											{post.title}
										</h3>
										<p className="text-gray-600 text-sm mb-4 break-words line-clamp-2">
											{post.content}
										</p>

										{/* 게시글 푸터 */}
										<div className="flex items-center gap-4 text-gray-400 text-sm">
											<div className="flex items-center gap-1">
												<Icon name="heart" size={16} />
												<span>{post.likes}</span>
											</div>
											<div className="flex items-center gap-1">
												<Icon name="message" size={16} />
												<span>{post.comments}</span>
											</div>
											<div className="flex items-center gap-1">
												<Icon name="eye" size={16} />
												<span>{post.views}</span>
											</div>
										</div>
									</div>

									{/* 이미지 영역 - 두 번째 게시글에만 표시 */}
									{post.id === 2 && (
										<div className="hidden sm:flex items-center justify-center w-[7.5rem] h-[7.5rem] bg-gray-50 rounded-lg shrink-0">
											<span className="text-gray-400 text-sm">이미지</span>
										</div>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>

			{/* 모바일 플로팅 버튼 */}
			<button
				onClick={onWrite}
				className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[3.5rem] h-[3.5rem] rounded-full bg-primary-20 shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-primary-30 transition-colors"
			>
				<Icon name="edit" size={24} className="text-primary-dark" />
			</button>
		</>
	);
};

export default CommunityForm;
