import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";

interface CommunityFormProps {
	onWrite: () => void;
}

const CommunityForm = ({ onWrite }: CommunityFormProps) => {
	const categories = ["전체글", "일상글", "간호지식 Q&A", "이직 정보", "HOT"];

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
	];

	return (
		<div className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
			{/* 상단 버튼 영역 */}
			<div className="flex justify-between items-center mb-6">
				<div className="flex gap-2">
					{categories.map((category) => (
						<button
							key={category}
							className="px-4 py-2 text-sm rounded-lg hover:bg-primary-10 hover:text-primary-dark transition-colors"
						>
							{category}
						</button>
					))}
				</div>
				<Button size="sm" color="primary" onClick={onWrite}>
					글쓰기
				</Button>
			</div>

			{/* 추천 게시글 영역 */}
			<div className="mb-6 p-4 border border-gray-200 rounded-lg">
				<h3 className="text-lg font-semibold mb-4">추천 게시글</h3>
				<div className="flex items-center gap-2">
					<span className="px-2 py-1 bg-primary-10 text-primary-dark rounded text-sm">
						동기들이랑 3년 차 기념 여행...
					</span>
					<span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
						수혈이 난감해,,ㅜ
					</span>
				</div>
			</div>

			{/* 게시글 목록 */}
			<div className="space-y-4">
				{posts.map((post) => (
					<div
						key={post.id}
						className="p-4 border border-gray-200 rounded-lg hover:border-primary-dark cursor-pointer transition-colors"
					>
						{/* 게시글 헤더 */}
						<div className="flex items-center gap-2 mb-2">
							<Icon name="user" size={20} className="text-gray-400" />
							<span className="font-medium text-sm">{post.nickname}</span>
							<span className="text-gray-400 text-sm">·</span>
							<span className="text-gray-600 text-sm">{post.category}</span>
							<span className="text-gray-400 text-sm">·</span>
							<span className="text-gray-400 text-sm">{post.timeAgo}</span>
						</div>

						{/* 게시글 내용 */}
						<h3 className="text-lg font-medium mb-2">{post.title}</h3>
						<p className="text-gray-600 text-sm mb-4">{post.content}</p>

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
				))}
			</div>
		</div>
	);
};

export default CommunityForm;
