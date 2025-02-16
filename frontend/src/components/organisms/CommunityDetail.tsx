import { Icon } from "../atoms/Icon";
import { Button } from "../atoms/Button";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowUpLong } from "react-icons/fa6";
import { formatTimeAgo } from "@/utils/dateUtiles";

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

	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(post.likeCnt);

	// 드롭다운 외부 클릭 처리
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!(event.target as Element).closest(".dropdown-container")) {
				setShowDropdown(false);
				setShowCommentDropdown(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleDropdownClick = (action: "edit" | "delete") => {
		setShowDropdown(false);
		if (action === "edit") {
			console.log("수정하기");
		} else {
			console.log("삭제하기");
		}
	};

	const handleLikeClick = () => {
		if (isLiked) {
			setLikeCount((prev) => prev - 1);
		} else {
			setLikeCount((prev) => prev + 1);
		}
		setIsLiked(!isLiked);
	};

	return (
		<div className="bg-white rounded-xl p-4 lg:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
			{/* 게시글 헤더 */}
			<div className="flex justify-between items-start mb-4">
				<div className="flex flex-wrap items-center gap-2">
					<Icon name="user" size={24} className="text-gray-400" />
					<span className="font-medium">{post.nickname}</span>
					<span className="text-gray-400">·</span>
					<span className="text-gray-600">{post.category}</span>
					<span className="text-gray-400">·</span>
					<span className="text-gray-400">{formatTimeAgo(post.createdAt)}</span>
				</div>

				{/* 드롭다운 메뉴 */}
				<div className="relative">
					<button
						onClick={() => setShowDropdown(!showDropdown)}
						className="p-1 hover:bg-gray-100 rounded-full"
					>
						<BsThreeDotsVertical className="w-5 h-5 text-gray-500" />
					</button>

					{showDropdown && (
						<div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
							<button
								onClick={() => handleDropdownClick("edit")}
								className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
							>
								수정하기
							</button>
							<button
								onClick={() => handleDropdownClick("delete")}
								className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 rounded-b-lg"
							>
								삭제하기
							</button>
						</div>
					)}
				</div>
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
					<span>{post.comments.length}</span>
				</div>
				<div className="flex items-center gap-1">
					<Icon name="eye" size={16} />
					<span>{post.viewCnt}</span>
				</div>
			</div>

			{/* 댓글 목록 */}
			<div className="mb-3 divide-y divide-gray-200">
				{post.comments.map((comment) => (
					<div key={comment.commentId} className="py-4 first:pt-0 last:pb-0">
						<div className="flex justify-between items-start">
							<div className="flex items-center gap-2">
								<Icon name="user" size={20} className="text-gray-400" />
								<span className="font-medium text-sm">{comment.nickname}</span>
								<span className="text-gray-400 text-sm">·</span>
								<span className="text-gray-400 text-sm">
									{formatTimeAgo(comment.createdAt)}
								</span>
							</div>

							{/* 댓글 드롭다운 */}
							<div className="relative dropdown-container">
								<button
									onClick={() =>
										setShowCommentDropdown(
											showCommentDropdown === comment.commentId
												? null
												: comment.commentId,
										)
									}
									className="p-1 hover:bg-gray-100 rounded-full"
								>
									<BsThreeDotsVertical className="w-4 h-4 text-gray-500" />
								</button>

								{showCommentDropdown === comment.commentId && (
									<div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
										<button
											onClick={() => {
												console.log("댓글 수정");
												setShowCommentDropdown(null);
											}}
											className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
										>
											수정하기
										</button>
										<button
											onClick={() => {
												console.log("댓글 삭제");
												setShowCommentDropdown(null);
											}}
											className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 rounded-b-lg"
										>
											삭제하기
										</button>
									</div>
								)}
							</div>
						</div>
						<p className="text-gray-700 text-sm mt-2">{comment.content}</p>
					</div>
				))}
			</div>

			{/* 댓글 작성 */}
			<div className="relative">
				<textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="댓글을 입력해주세요"
					className="w-full p-4 border border-gray-200 rounded-lg resize-none h-24"
				/>

				<Button color="primary" size="sm" className="absolute bottom-3 right-2">
					<FaArrowUpLong />
				</Button>
			</div>
		</div>
	);
};

export default CommunityDetail;
