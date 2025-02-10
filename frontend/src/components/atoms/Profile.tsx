import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
	return (
		<div className="px-[1.3rem] pb-10">
			<div className="flex flex-col">
				{/* 마이페이지 텍스트와 아이콘 */}
				<div className="flex items-center gap-x-6 px-4 mb-4">
					<FaUserCircle className="w-[1.125rem] h-[1.125rem] min-w-[1.125rem] text-gray-500" />
					<span className="text-sm font-semibold">마이페이지</span>
				</div>

				{/* 가운데 정렬된 선 */}
				<div className="mx-2 mb-4">
					<div className="border-t border-gray-200 w-full"></div>
				</div>

				{/* 회사명과 사이트 주소 */}
				<div className="flex flex-col gap-y-1 px-4">
					<span className="text-xs font-bold text-gray-600">
						(주)듀티메이트
					</span>
					<span className="text-xs text-gray-400">
						<a href="#">개인정보처리방침</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Profile);
