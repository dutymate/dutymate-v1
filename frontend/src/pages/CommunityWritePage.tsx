import CommunityLayout from "@/components/organisms/CommunityLayout";
import CommunityWrite from "../components/organisms/CommunityWrite";
import { useNavigate } from "react-router-dom";

const CommunityWritePage = () => {
	const navigate = useNavigate();

	return (
		<CommunityLayout
			title="글쓰기"
			subtitle="동료들과 나누고 싶은 이야기를 작성해보세요."
		>
			<button
				onClick={() => navigate("/community")}
				className="mb-4 text-gray-600"
			>
				← 목록으로
			</button>
			<CommunityWrite />
		</CommunityLayout>
	);
};

export default CommunityWritePage;
