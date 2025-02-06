import Sidebar from "../components/organisms/WSidebar";
import Title from "../components/atoms/Title";
import WardAdminForm from "../components/organisms/WardAdminForm";

const WardAdmin = () => {
	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			{/* Sidebar 영역 - userType prop 전달 */}
			<div className="w-[238px] shrink-0">
				<Sidebar userType="head" />
			</div>

			{/* 메인 컨텐츠 영역 */}
			<div className="flex-1 min-w-0 px-8 py-6">
				<Title title="병동 관리" subtitle="" />
				<div className="mt-6">
					<WardAdminForm />
				</div>
			</div>
		</div>
	);
};

export default WardAdmin;
