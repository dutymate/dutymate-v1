// ReqAdminTable.tsx

import { useState, useEffect } from "react";
// import { SmallSearchInput } from "../atoms/Input";
// import { SortButton, FilterButton } from "../atoms/SubButton";
import { DutyBadgeKor } from "../atoms/DutyBadgeKor";
import { FaUserCircle } from "react-icons/fa";
import { ApprovalBtn } from "../atoms/ApprovalBtn";
import { requestService } from "../../services/requestService";
import { toast } from "react-toastify";
import { WardRequest } from "../../services/requestService";
import { useLoadingStore } from "@/store/loadingStore";

const ReqAdminTable = () => {
	const [requests, setRequests] = useState<WardRequest[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm] = useState("");
	// const [ setSearchTerm] = useState("");

	// 요청 목록 조회
	const fetchRequests = async () => {
		useLoadingStore.getState().setLoading(true);
		try {
			const data = await requestService.getWardRequests();
			setRequests(data);
		} catch (error) {
			toast.error("요청 목록을 불러오는데 실패했습니다");
		} finally {
			useLoadingStore.getState().setLoading(false);
			setIsLoading(false);
		}
	};

	// 상태 변경 처리
	const handleStatusChange = async (
		requestId: number,
		memberId: number,
		status: "ACCEPTED" | "DENIED" | "HOLD",
	) => {
		// 이전 상태 저장
		const prevRequest = requests.find(
			(request) => request.requestId === requestId,
		);
		if (!prevRequest) return;

		// 즉시 UI 업데이트
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
			// API 호출 실패 시 이전 상태로 복구
			setRequests((prevRequests) =>
				prevRequests.map((request) =>
					request.requestId === requestId
						? { ...request, status: prevRequest.status }
						: request,
				),
			);
			toast.error("요청 상태 변경에 실패했습니다");
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
			<div className="bg-white rounded-[1.154375rem] p-4">
				{/* 검색 및 필터 영역 */}
				<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 px-2">
					{/* 제목과 정렬/필터 버튼을 한 줄에 */}
					<div className="w-full flex justify-between items-center mb-2 lg:mb-0">
						{/* <h2 className="text-lg font-semibold">요청 내역</h2> */}
					</div>

					{/* 검색창과 데스크톱용 정렬/필터 */}
					<div className="flex flex-row gap-1 lg:gap-2 w-full lg:w-auto items-center">
						{/* 검색창 */}
						{/* <div className="w-[140px] lg:w-[260px]">
							<SmallSearchInput
								id="search-nurse"
								name="search-nurse"
								placeholder="이름으로 검색하기"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div> */}
						{/* 모바일 정렬/필터 버튼 */}
						{/* <div className="flex lg:hidden gap-1 ml-auto">
							<SortButton label="정렬" />
							<FilterButton label="필터" />
						</div> */}
						{/* 데스크톱 정렬/필터 버튼 */}
						{/* <div className="hidden lg:flex gap-2 flex-shrink-0">
							<SortButton label="정렬" />
							<FilterButton label="필터" />
						</div> */}
					</div>
				</div>

				{/* 요청 목록 */}
				<div className="overflow-y-auto overflow-x-auto px-2">
					<div className="flex flex-col gap-2 min-w-[80vw] lg:min-w-[60vw] min-h-[600px]">
						{/* 헤더 */}
						<div className="flex items-center p-1.5 lg:p-2 mb-2 text-sm lg:text-base text-gray-600 font-medium bg-base-muted-30 rounded-xl">
							<div className="flex items-center justify-between flex-1 gap-10">
								<div className="flex items-center gap-6 flex-shrink-0">
									<div className="w-[120px] pl-2">이름</div>
									<div className="w-[90px] text-center">날짜</div>
									<div className="w-[66px] text-center">근무</div>
									<div className="w-[180px] text-center">요청 내용</div>
								</div>
								<div className="flex items-center gap-6 flex-1 min-w-0">
									<div className="flex-1 text-center">상태</div>
								</div>
							</div>
						</div>

						{/* 요청 목록 또는 빈 상태 메시지 */}
						{filteredRequests.length === 0 ? (
							<div className="flex items-center justify-center h-[400px] text-gray-500">
								요청 내역이 없습니다.
							</div>
						) : (
							filteredRequests.map((request) => (
								<div
									key={request.requestId}
									className="flex items-center justify-between p-2 lg:p-3 bg-white rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow"
								>
									<div className="flex items-center gap-2 lg:gap-4 flex-1 min-w-0">
										{/* 프로필 및 이름 */}
										<div className="w-[15vw] min-w-[120px] max-w-[180px] flex items-center pl-2 lg:pl-4">
											<FaUserCircle className="w-6 h-6 text-gray-500 flex-shrink-0" />
											<span className="font-medium truncate ml-2">
												{request.name}
											</span>
										</div>

										{/* 날짜 */}
										<div className="w-[12vw] min-w-[90px] max-w-[120px] text-gray-600 text-xs lg:text-sm text-center">
											{request.date}
										</div>

										{/* Duty 뱃지 */}
										<div className="w-[8vw] min-w-[66px] max-w-[88px] flex justify-center scale-75 lg:scale-90">
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
										<div className="w-[25vw] lg:w-[30vw] truncate text-gray-600 text-xs lg:text-sm text-center">
											{request.memo}
										</div>
									</div>

									{/* 승인/거절 버튼 */}
									<div className="w-[15vw] min-w-[180px] max-w-[240px] flex justify-end scale-75 lg:scale-90">
										<ApprovalBtn
											onApprove={() =>
												handleStatusChange(
													request.requestId,
													request.memberId,
													"ACCEPTED",
												)
											}
											onReject={() =>
												handleStatusChange(
													request.requestId,
													request.memberId,
													"DENIED",
												)
											}
											onHold={() =>
												handleStatusChange(
													request.requestId,
													request.memberId,
													"HOLD",
												)
											}
											currentStatus={request.status}
										/>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReqAdminTable;
