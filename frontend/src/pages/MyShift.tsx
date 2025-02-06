import Sidebar from "../components/organisms/WSidebar";
import Title from "../components/atoms/Title";

const MyShift = () => {
	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			{/* Sidebar 영역 - userType prop 전달 */}
			<div className="w-[238px] shrink-0">
				<Sidebar userType="head" /> {/* 또는 userType="staff" */}
			</div>

			{/* 메인 컨텐츠 영역 */}
			<div className="flex-1 min-w-0 px-8 py-6">
				{/* ✅ Title 컴포넌트 적용 */}
				<Title title="듀티표 관리" subtitle="부제목을 입력하세요" />
			</div>
		</div>
	);
};

export default MyShift;
