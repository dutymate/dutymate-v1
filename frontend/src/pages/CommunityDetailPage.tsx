import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import boardService from "@/services/boardService";
import CommunityDetail from "../components/organisms/CommunityDetail";
import { toast } from "react-toastify";
import CommunityLayout from "@/components/organisms/CommunityLayout";

const CommunityDetailPage = () => {
	const { boardId } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState<any>(null);

	// boardId가 존재하는지 확인하고 숫자로 변환
	const numericBoardId = boardId ? Number(boardId) : NaN;

	useEffect(() => {
		if (isNaN(numericBoardId)) {
			toast.error("잘못된 게시글 ID입니다.");
			navigate("/community");
			return;
		}

		const fetchPost = async () => {
			try {
				const data = await boardService.getSinglePosts(numericBoardId);
				if (!data) {
					throw new Error("게시글 데이터를 찾을 수 없습니다.");
				}
				setPost(data);
			} catch (error) {
				toast.error("게시글을 불러오는 데 실패했습니다.");
				navigate("/community");
			}
		};

		fetchPost();
	}, [numericBoardId, navigate]);

	if (!post)
		return (
			<CommunityLayout title="게시글" subtitle="동료들의 이야기를 읽어보세요">
				<p>Loading...</p>
			</CommunityLayout>
		);

	return (
		<CommunityLayout title="게시글" subtitle="동료들의 이야기를 읽어보세요">
			<button
				onClick={() => navigate("/community")}
				className="mb-4 text-gray-600"
			>
				← 목록으로
			</button>
			<CommunityDetail post={post} />
		</CommunityLayout>
	);
};

export default CommunityDetailPage;
