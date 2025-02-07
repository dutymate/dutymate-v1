import Sidebar from "../components/organisms/WSidebar";
import Title from "../components/atoms/Title";
import CommunityForm from "../components/organisms/CommunityForm";

const Community = () => {
	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			<div className="w-[238px] shrink-0">
				<Sidebar userType="head" />
			</div>
			<div className="flex-1 min-w-0 px-8 py-6">
				<div className="mb-3">
					<Title title="커뮤니티" subtitle="다른 간호사들과 소통해보세요" />
				</div>
				<div className="mt-6">
					<CommunityForm />
				</div>
			</div>
		</div>
	);
};

export default Community;
