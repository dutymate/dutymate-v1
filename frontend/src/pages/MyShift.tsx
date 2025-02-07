import Sidebar from "../components/organisms/WSidebar";
import Title from "../components/atoms/Title";
import MyShiftCalendar from "../components/organisms/MyShiftCalendar";

const MyShift = () => {
	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			{/* Sidebar 영역 - userType prop 전달 */}
			<div className="w-[238px] shrink-0">
				<Sidebar userType="head" /> {/* 또는 userType="staff" */}
			</div>

			{/* 메인 컨텐츠 영역 */}
			<div className="flex-1 min-w-0 px-8 py-6">
				<div className="mb-3">
					<Title
						title="나의 근무표 보기"
						subtitle="나의 근무 일정을 확인해보세요"
					/>
				</div>
				<MyShiftCalendar />
			</div>
		</div>
	);
};

export default MyShift;
