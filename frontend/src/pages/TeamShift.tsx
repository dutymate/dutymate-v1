import Sidebar from "../components/organisms/WSidebar";
import Title from "../components/atoms/Title";
import TeamShiftTable from "../components/organisms/TeamShiftTable";

const TeamShift = () => {
	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			{/* Sidebar 영역 */}
			<div className="w-[238px] shrink-0">
				<Sidebar userType="head" />
			</div>

			{/* 메인 컨텐츠 영역 */}
			<div className="flex-1 min-w-0 px-8 py-6">
				<Title
					title="병동 듀티표"
					subtitle="우리 병동의 전체 듀티표를 확인해보세요."
				/>
				<div className="mt-6">
					<TeamShiftTable />
				</div>
			</div>
		</div>
	);
};

export default TeamShift;
