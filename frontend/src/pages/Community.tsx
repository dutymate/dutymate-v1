import CommunityLayout from "@/components/organisms/CommunityLayout";
import CommunityForm from "../components/organisms/CommunityForm";
import { useNavigate } from "react-router-dom";

const Community = () => {
	const navigate = useNavigate();

	// 게시글 클릭 시 상세 페이지로 이동
	const handlePostClick = (post: any) => {
		navigate(`/community/${post.boardId}`);
	};

	// 글쓰기 버튼 클릭 시 이동
	const handleWrite = () => {
		navigate("/community/write");
	};

	return (
		<CommunityLayout title="커뮤니티" subtitle="동료들과 소통해보세요">
			<CommunityForm onWrite={handleWrite} onPostClick={handlePostClick} />
		</CommunityLayout>
	);
};

export default Community;
