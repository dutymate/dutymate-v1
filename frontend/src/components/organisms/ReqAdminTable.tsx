// ReqAdminTable.tsx

import { useState, useEffect } from "react";
import { SmallSearchInput } from "../atoms/Input";
import { SortButton, FilterButton } from "../atoms/SubButton";
import { DutyBadgeKor } from "../atoms/DutyBadgeKor";
import { FaUserCircle } from "react-icons/fa";
import { ApprovalBtn } from "../atoms/ApprovalBtn";
import { requestService } from "../../services/requestService";
import { toast } from "react-toastify";
import { WardRequest } from "../../services/requestService";

const ReqAdminTable = () => {
	const [requests, setRequests] = useState<WardRequest[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	// 요청 목록 조회
	const fetchRequests = async () => {
		try {
			const data = await requestService.getWardRequests();
			setRequests(data);
		} catch (error) {
			toast.error("요청 목록을 불러오는데 실패했습니다");
		} finally {
			setIsLoading(false);
		}
	};

	// 상태 변경 처리
	const handleStatusChange = async (
		requestId: number,
		memberId: number,
		status: "승인" | "거절" | "대기",
	) => {
		// 먼저 로컬 상태 업데이트
		setRequests((prevRequests) =>
			prevRequests.map((request) =>
				request.requestId === requestId ? { ...request, status } : request,
			),
		);

		try {
			// 백그라운드에서 API 호출
			await requestService.editRequestStatus(requestId, {
				memberId,
				status,
			});
			toast.success("요청 상태가 변경되었습니다");
		} catch (error) {
			// API 호출 실패 시 원래 상태로 복구
			setRequests((prevRequests) =>
				prevRequests.map((request) =>
					request.requestId === requestId
						? { ...request, status: request.status }
						: request,
				),
			);
			toast.error("상태 변경에 실패했습니다");
		}
	};

	useEffect(() => {
		fetchRequests();
	}, []);

	// 검색 필터링
	const filteredRequests = requests.filter((request) =>
		request.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

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
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
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
						{filteredRequests.map((request) => (
							<div
								key={request.requestId}
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
												request.shift === "D"
													? "day"
													: request.shift === "E"
														? "evening"
														: request.shift === "N"
															? "night"
															: "off"
											}
											size="xs"
										/>
									</div>

									{/* 요청 내용 */}
									<div className="flex-1 truncate text-gray-600 text-xs lg:text-sm text-center px-4">
										{request.memo}
									</div>
								</div>

								{/* 승인/거절 버튼 */}
								<div className="w-[200px] lg:w-[240px] flex justify-end scale-[0.75]">
									<ApprovalBtn
										onApprove={() =>
											handleStatusChange(
												request.requestId,
												request.memberId,
												"승인",
											)
										}
										onReject={() =>
											handleStatusChange(
												request.requestId,
												request.memberId,
												"거절",
											)
										}
										onHold={() =>
											handleStatusChange(
												request.requestId,
												request.memberId,
												"대기",
											)
										}
										currentStatus={request.status}
									/>
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
