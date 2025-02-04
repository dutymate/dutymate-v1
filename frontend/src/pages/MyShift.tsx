import Sidebar from "../components/organisms/WSidebar";
import Title from "../components/atoms/Title";

const MyShift = () => {
	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			{/* Sidebar 적용 */}
			<div className="w-[20%] min-w-[280px] max-w-[25%] h-full">
				<Sidebar />
			</div>

			{/* 메인 컨텐츠 영역 */}
			<div className="w-[68.75rem] mx-auto flex flex-col px-[2%] py-6 bg-[#F4F4F4]">
				{/* ✅ Title 컴포넌트 적용 */}
				<Title className="px-4" title="듀티표 관리" subtitle="부제목을 입력하세요" />
			</div>
		</div>
	);
};

export default MyShift;
