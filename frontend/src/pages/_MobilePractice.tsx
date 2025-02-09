import { useState } from "react";
import MSidebar from "@/components/organisms/MSidebar";
import { IoMdMenu } from "react-icons/io";

const MobilePractice = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	return (
		<div className="flex min-h-screen bg-gray-50">
			{showSidebar && (
				<MSidebar
					userType="head"
					onClose={() => setShowSidebar(false)}
					isOpen={showSidebar}
				/>
			)}
			<main className={`flex-1 p-8 ${showSidebar ? "ml-[238px]" : ""}`}>
				{/* 메뉴 아이콘 */}
				<button
					onClick={() => setShowSidebar(true)}
					className="mb-4 text-gray-500 hover:text-gray-700"
				>
					<IoMdMenu className="w-6 h-6" />
				</button>
				{/* 컨텐츠 */}
			</main>
		</div>
	);
};

export default MobilePractice;
