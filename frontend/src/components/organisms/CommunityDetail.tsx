import { Icon } from "../atoms/Icon";
import { Button } from "../atoms/Button";
import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowUpLong } from "react-icons/fa6";
import { formatTimeAgo } from "@/utils/dateUtiles";
import boardService from "@/services/boardService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Comment {
	commentId: number;
	nickname: string;
	profileImg: string;
	content: string;
	createdAt: string;
	isMyWrite: boolean;
}

interface CommunityDetailProps {
	post: {
		boardId: number;
		nickname: string;
		profileImg: string;
		category: string;
		createdAt: string;
		title: string;
		content: string;
		boardImgUrl?: string;
		likeCnt: number;
		commentCnt: number;
		viewCnt: number;
		isMyWrite: boolean;
		comments: Comment[];
	};
}

const CommunityDetail = ({ post }: CommunityDetailProps) => {
	const [newComment, setNewComment] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [showCommentDropdown, setShowCommentDropdown] = useState<number | null>(
		null,
	);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(post.likeCnt);
	const [commentCount, setCommentCount] = useState(post.commentCnt);
	const [commentList, setCommentList] = useState<Comment[]>(post.comments);

	const navigate = useNavigate();

	// 드롭다운 외부 클릭 처리
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShowDropdown(false);
				setShowCommentDropdown(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLikeClick = () => {
		setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
		setIsLiked(!isLiked);
	};

	const handleUpdateBoard = async () => {
		console.log("수정 기능");
	};

	const handleDeleteBoard = async (event: React.MouseEvent) => {
		event.stopPropagation();

		try {
			await boardService.deleteBoard(post.boardId);
			setShowDropdown(false);
			toast.success("게시글이 성공적으로 삭제 되었습니다.");
			navigate("/community");
		} catch (error) {
			console.error("게시글 삭제 오류:", error);
			toast.error("게시글 삭제를 실패했습니다.");
		}
	};

	const handleUpdateComment = async () => {
		console.log("수정 기능");
	};

	const handleDeleteComment = async (
		event: React.MouseEvent,
		commentId: number,
	) => {
		event.stopPropagation();

		try {
			await boardService.deleteComment(post.boardId, commentId);
			setShowCommentDropdown(commentId);
			setCommentList((preComments) =>
				preComments.filter((comment) => comment.commentId !== commentId),
			);
			setCommentCount(commentCount - 1);
			toast.success("댓글이 성공적으로 삭제 되었습니다.");
		} catch (error) {
			console.error("댓글 삭제 오류:", error);
			toast.error("댓글 삭제를 실패했습니다.");
		}
	};

	const handleAddComment = async () => {
		if (!newComment.trim()) {
			toast.error("댓글을 입력해주세요.");
			return;
		}

		try {
			const response = await boardService.writeComment(
				newComment,
				post.boardId,
			);

			const newCommentData: Comment = {
				commentId: response.commentId,
				nickname: response.nickname,
				profileImg: response.profileImg || "",
				content: response.content,
				createdAt: formatTimeAgo(new Date(response.createdAt).toISOString()), // 현재 시간
				isMyWrite: response.isMyWrite,
			};

			setCommentList((preComments) => [...preComments, newCommentData]);
			setCommentCount(commentCount + 1);

			// 댓글 입력창 초기화
			setNewComment("");
		} catch (error) {
			console.error("댓글 작성 오류:", error);
		}
	};

	return (
		<div className="bg-white rounded-xl p-4 lg:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
			{/* 게시글 헤더 */}
			<div className="flex justify-between items-start mb-4">
				<div className="flex flex-wrap items-center gap-2">
					<Icon name="user" size={24} className="text-gray-400" />
					<span className="font-medium">{post.nickname}</span>
					<span className="text-gray-400">·</span>
					<span className="text-gray-600">
						{post.category === "DAILY"
							? "일상글"
							: post.category === "QNA"
								? "간호지식 Q&A"
								: "이직 정보"}
					</span>
					<span className="text-gray-400">·</span>
					<span className="text-gray-400">{formatTimeAgo(post.createdAt)}</span>
				</div>

				{/* 드롭다운 메뉴 */}
				{post.isMyWrite ? (
					<div className="relative" ref={dropdownRef}>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setShowDropdown(!showDropdown);
							}}
							className="p-1 hover:bg-gray-100 rounded-full"
						>
							<BsThreeDotsVertical className="w-5 h-5 text-gray-500" />
						</button>

						{showDropdown && (
							<div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
								<button
									onClick={handleUpdateBoard}
									className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
								>
									수정하기
								</button>
								<button
									onClick={handleDeleteBoard}
									className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 rounded-b-lg"
								>
									삭제하기
								</button>
							</div>
						)}
					</div>
				) : (
					""
				)}
			</div>

			{/* 게시글 제목 */}
			<h1 className="text-xl lg:text-2xl font-bold mb-4 break-words">
				{post.title}
			</h1>

			{/* 게시글 내용 */}
			<p className="text-gray-800 mb-6 whitespace-pre-wrap break-words">
				{post.content}
			</p>

			{/* 게시글 이미지 */}
			{post.boardImgUrl && (
				<div className="mb-6">
					<img
						src={post.boardImgUrl}
						alt="게시글 이미지"
						className="rounded-lg w-full"
					/>
				</div>
			)}

			{/* 게시글 상호작용 */}
			<div className="flex items-center gap-4 text-gray-400 text-sm mb-8">
				<button
					onClick={handleLikeClick}
					className="flex items-center gap-1 transition-colors hover:text-primary-dark"
				>
					<Icon
						name={isLiked ? "heartFilled" : "heart"}
						size={16}
						className={isLiked ? "text-primary-dark" : ""}
					/>
					<span className={isLiked ? "text-primary-dark" : ""}>
						{likeCount}
					</span>
				</button>
				<div className="flex items-center gap-1">
					<Icon name="message" size={16} />
					<span>{commentCount}</span>
				</div>
				<div className="flex items-center gap-1">
					<Icon name="eye" size={16} />
					<span>{post.viewCnt}</span>
				</div>
			</div>

			{/* 댓글 목록 */}
			<div className="mb-3 divide-y divide-gray-200">
				{commentList.length === 0 ? (
					<div className="py-4 text-center text-gray-400">댓글이 없습니다.</div>
				) : (
					commentList.map((comment) => (
						<div key={comment.commentId} className="py-4 first:pt-0 last:pb-0">
							<div className="flex justify-between items-start">
								<div className="flex items-center gap-2">
									<Icon name="user" size={20} className="text-gray-400" />
									<span className="font-medium text-sm">
										{comment.nickname}
									</span>
									<span className="text-gray-400 text-sm">·</span>
									<span className="text-gray-400 text-sm">
										{formatTimeAgo(comment.createdAt)}
									</span>
								</div>

								{/* 댓글 드롭다운 */}
								{comment.isMyWrite ? (
									<div
										className="relative dropdown-container"
										ref={dropdownRef}
									>
										<button
											onClick={(e) => {
												e.stopPropagation();
												setShowCommentDropdown(
													showCommentDropdown === comment.commentId
														? null
														: comment.commentId,
												);
											}}
											className="p-1 hover:bg-gray-100 rounded-full"
										>
											<BsThreeDotsVertical className="w-4 h-4 text-gray-500" />
										</button>

										{showCommentDropdown === comment.commentId && (
											<div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
												<button
													onClick={(e) => {
														e.stopPropagation();
														handleUpdateComment();
													}}
													className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
												>
													수정하기
												</button>
												<button
													onClick={(e) => {
														e.stopPropagation();
														handleDeleteComment(e, comment.commentId);
													}}
													className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 rounded-b-lg"
												>
													삭제하기
												</button>
											</div>
										)}
									</div>
								) : (
									""
								)}
							</div>
							<p className="text-gray-700 text-sm mt-2">{comment.content}</p>
						</div>
					))
				)}
			</div>

			{/* 댓글 작성 */}
			<div className="relative">
				<textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="댓글을 입력해주세요."
					className="w-full p-4 border border-gray-200 rounded-lg resize-none h-24"
				/>

				<Button
					color="primary"
					size="sm"
					className="absolute bottom-3 right-2"
					onClick={handleAddComment}
				>
					<FaArrowUpLong />
				</Button>
			</div>
		</div>
	);
};

export default CommunityDetail;
