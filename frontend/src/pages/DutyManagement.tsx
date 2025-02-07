import Sidebar from "../components/organisms/WSidebar";
import Title from "../components/atoms/Title";
import ShiftAdminTable from "../components/organisms/ShiftAdminTable";
import RuleCheckList from "../components/organisms/RuleCheckList";
import HistoryList from "../components/organisms/HistoryList";

const DutyManagement = () => {
	return (
		<div className="w-full min-h-screen flex flex-row bg-[#F4F4F4]">
			<div className="w-[238px] shrink-0">
				<Sidebar userType="head" />
			</div>
			<div className="flex-1 min-w-0 px-8 py-6 overflow-y-auto">
				<div className="mb-3">
					<Title title="듀티표 관리" subtitle="병동 듀티표를 관리해보세요" />
				</div>
				<div className="mt-6 flex flex-col gap-4 pb-8">
					<ShiftAdminTable />
					<div className="flex gap-4">
						<RuleCheckList />
						<HistoryList />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DutyManagement;
