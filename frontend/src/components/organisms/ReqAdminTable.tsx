// ReqAdminTable.tsx

import { SmallSearchInput } from "../atoms/Input";
import { SortButton, FilterButton } from "../atoms/SubButton";
import { DutyBadgeKor } from "../atoms/DutyBadgeKor";
import { FaUserCircle } from "react-icons/fa";
import { ApprovalBtn } from "../atoms/ApprovalBtn";

const ReqAdminTable = () => {
	// 더미 데이터를 다양한 근무 타입으로 수정
	const requests = [
		{
			name: "봉미선 간호사",
			date: "2025/01/01",
			duty: "D",
			content: "7일 데이 근무 오프 신청합니다.",
		},
		{
			name: "신짱구 간호사",
			date: "2025/01/02",
			duty: "E",
			content: "이브닝 근무 신청합니다.",
		},
		{
			name: "김철수 간호사",
			date: "2025/01/03",
			duty: "N",
			content: "나이트 근무로 변경 요청드립니다.",
		},
		{
			name: "이훈이 간호사",
			date: "2025/01/04",
			duty: "O",
			content: "오프 근무 신청합니다.",
		},
		{
			name: "맹구 간호사",
			date: "2025/01/05",
			duty: "E",
			content: "이브닝 근무 변경 부탁드립니다.",
		},
		{
			name: "유리 간호사",
			date: "2025/01/06",
			duty: "N",
			content: "나이트 근무 신청합니다.",
		},
		{
			name: "수지 간호사",
			date: "2025/01/07",
			duty: "D",
			content: "데이 근무로 변경해주세요.",
		},
		{
			name: "채성아 간호사",
			date: "2025/01/08",
			duty: "O",
			content: "개인 사정으로 오프 신청합니다.",
		},
		{
			name: "이슬이 간호사",
			date: "2025/01/09",
			duty: "N",
			content: "나이트 근무 변경 요청드립니다.",
		},
	];

	return (
		<div className="w-full">
			{/* 전체 컨테이너의 패딩 감소 */}
			<div className="bg-white rounded-[1.154375rem] p-2 lg:p-3">
				{/* 검색 및 필터 영역의 하단 마진 감소 */}
				<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-3 px-6">
					{/* 제목과 정렬/필터 버튼을 한 줄에 */}
					<div className="w-full flex justify-between items-center mb-2 lg:mb-0">
						<h2 className="text-lg font-semibold">요청 내역</h2>
					</div>

					{/* 검색창과 데스크톱용 정렬/필터 */}
					<div className="flex flex-row gap-1 lg:gap-2 w-full lg:w-auto items-center">
						{/* 검색창 */}
						<div className="w-[140px] lg:w-[260px]">
							<SmallSearchInput
								id="search-nurse"
								name="search-nurse"
								placeholder="이름으로 검색하기"
							/>
						</div>
						{/* 모바일 정렬/필터 버튼 */}
						<div className="flex lg:hidden gap-1 ml-auto">
							<SortButton label="정렬" />
							<FilterButton label="필터" />
						</div>
						{/* 데스크톱 정렬/필터 버튼 */}
						<div className="hidden lg:flex gap-2 flex-shrink-0">
							<SortButton label="정렬" />
							<FilterButton label="필터" />
						</div>
					</div>
				</div>

				{/* 요청 목록 */}
				<div className="space-y-3 lg:overflow-hidden overflow-x-auto px-6">
					<div className="min-w-[640px] lg:min-w-fit lg:w-full">
						{/* 헤더 */}
						<div className="flex items-center p-1.5 lg:p-2 mb-2 text-sm lg:text-base text-gray-600 font-medium bg-base-muted rounded-xl">
							<div className="flex items-center gap-4 lg:gap-6 flex-1 min-w-0">
								{/* 이름 헤더 */}
								<div className="min-w-[120px] lg:min-w-[140px] pl-8 lg:pl-12">
									이름
								</div>

								{/* 날짜 헤더 */}
								<div className="min-w-[90px] lg:min-w-[100px] text-center">
									요청 날짜
								</div>

								{/* 근무 헤더 */}
								<div className="min-w-[66px] lg:min-w-[88px] text-center whitespace-nowrap">
									요청 근무
								</div>

								{/* 내용 헤더 */}
								<div className="flex-1 text-center px-4 whitespace-nowrap">
									요청 내용
								</div>
							</div>

							{/* 관리 헤더 */}
							<div className="w-[200px] lg:w-[240px] text-right pr-16 whitespace-nowrap">
								요청 관리
							</div>
						</div>

						{/* 기존 요청 목록 */}
						{requests.map((request, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-0.5 lg:p-1 bg-white rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] mb-1.5 mx-1"
							>
								<div className="flex items-center gap-4 lg:gap-6 flex-1 min-w-0">
									{/* 프로필 및 이름 */}
									<div className="flex items-center gap-1 min-w-[120px] lg:min-w-[140px] pl-2">
										<FaUserCircle className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-gray-500" />
										<span className="font-medium truncate text-xs lg:text-sm">
											{request.name}
										</span>
									</div>

									{/* 날짜 */}
									<div className="min-w-[90px] lg:min-w-[100px] text-gray-600 text-xs lg:text-sm text-center">
										{request.date}
									</div>

									{/* Duty 뱃지 */}
									<div className="min-w-[66px] lg:min-w-[88px] flex justify-center scale-[0.60]">
										<DutyBadgeKor
											type={
												request.duty === "D"
													? "day"
													: request.duty === "E"
														? "evening"
														: request.duty === "N"
															? "night"
															: "off"
											}
											size="xs"
										/>
									</div>

									{/* 요청 내용 */}
									<div className="flex-1 truncate text-gray-600 text-xs lg:text-sm text-center px-4">
										{request.content}
									</div>
								</div>

								{/* 승인/거절 버튼 */}
								<div className="w-[200px] lg:w-[240px] flex justify-end scale-[0.75]">
									<ApprovalBtn />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReqAdminTable;
