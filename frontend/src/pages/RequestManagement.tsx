import Sidebar from "../components/organisms/WSidebar";
import Title from "../components/atoms/Title";

const RequestManagement = () => {
	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			<div className="w-[238px] shrink-0">
				<Sidebar userType="head" />
			</div>
			<div className="flex-1 min-w-0 px-8 py-6">
				<div className="mb-3">
					<Title
						title="요청 근무 관리"
						subtitle="간호사들의 근무 요청을 관리해보세요"
					/>
				</div>
			</div>
		</div>
	);
};

export default RequestManagement;
