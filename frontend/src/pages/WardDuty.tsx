import Sidebar from "../components/organisms/WSidebar";
import Title from "../components/atoms/Title";

const WardDuty = () => {
	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			<div className="w-[238px] shrink-0">
				<Sidebar userType="head" />
			</div>
			<div className="flex-1 min-w-0 px-8 py-6 overflow-y-auto">
				<div className="mb-3">
					<Title
						title="병동 듀티표"
						subtitle="병동의 전체 듀티표를 확인해보세요"
					/>
				</div>
			</div>
		</div>
	);
};

export default WardDuty;
