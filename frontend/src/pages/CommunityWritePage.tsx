import CommunityLayout from "@/components/organisms/CommunityLayout";
import CommunityWrite from "../components/organisms/CommunityWrite";

const CommunityWritePage = () => {
	return (
		<CommunityLayout
			title="글쓰기"
			subtitle="동료들과 나누고 싶은 이야기를 작성해보세요."
		>
			<CommunityWrite />
		</CommunityLayout>
	);
};

export default CommunityWritePage;
