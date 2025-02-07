import { useEffect, useState } from "react";
//import axios from 'axios';
import DutyBadgeEng from "../atoms/DutyBadgeEng";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import ReqShiftModal from "./ReqShiftModal";
// import { dutyService } from "../../services/dutyService"; //실제 API 호출에 필요한 axios import
// 임시 데이터 import
import mockData from "../../services/response-json/duty/GetApiDutyWard.json";

interface DutyMember {
	memberId: number;
	name: string;
	shifts: string;
}

interface DutyInfo {
	id: string; // _id에서 id로 변경
	year: number;
	month: number;
	duty: DutyMember[];
}

const TeamShiftTable = () => {
	const [dutyData, setDutyData] = useState<DutyInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isReqModalOpen, setIsReqModalOpen] = useState(false);

	useEffect(() => {
		const fetchDutyData = async () => {
			try {
				// 실제 API 호출 (현재는 주석 처리)
				// const response = await dutyService.getWardDuty();
				// setDutyData(response);

				// 임시 데이터 사용
				setDutyData(mockData);
			} catch (err) {
				setError("근무표를 불러오는데 실패했습니다.");
			} finally {
				setLoading(false);
			}
		};

		fetchDutyData();
	}, []);

	if (loading) return <div>로딩중...</div>;
	if (error) return <div>{error}</div>;
	if (!dutyData) return null;

	// 해당 월의 실제 일수 계산
	const daysInMonth = new Date(dutyData.year, dutyData.month, 0).getDate();
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	// 주말 체크 함수 추가
	const isWeekend = (year: number, month: number, day: number) => {
		const date = new Date(year, month - 1, day);
		return date.getDay() === 0 || date.getDay() === 6;
	};

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] p-6">
			<div className="flex items-center justify-between mb-4">
				<div className="w-[180px]">{/* 왼쪽 여백 공간 */}</div>
				<div className="flex items-center gap-14">
					<Icon
						name="left"
						size={24}
						className="cursor-pointer text-gray-300 hover:text-gray-400"
					/>
					<div className="text-lg font-medium">
						{dutyData.year}년 {dutyData.month}월
					</div>
					<Icon
						name="right"
						size={24}
						className="cursor-pointer text-gray-300 hover:text-gray-400"
					/>
				</div>
				<div className="flex gap-2 w-[180px] justify-end shrink-0">
					<Button
						text-size="lg"
						size="sm"
						color="primary"
						className="whitespace-nowrap px-3"
						onClick={() => setIsReqModalOpen(true)}
					>
						근무 요청
					</Button>
					<Button
						text-size="lg"
						size="sm"
						color="off"
						className="whitespace-nowrap px-3"
						onClick={() => console.log("다운로드")}
					>
						다운로드
					</Button>
				</div>
			</div>
			<div className="overflow-x-auto relative">
				<table className="min-w-full">
					<thead>
						<tr className="bg-gray-50">
							<th className="px-4 py-2 min-w-[80px] sticky left-0 bg-gray-50 z-10">
								<span className="text-gray-50">이름</span>
							</th>
							{days.map((day) => (
								<th
									key={day}
									className={`px-2 py-2 min-w-[40px] ${
										isWeekend(dutyData.year, dutyData.month, day)
											? "text-red-500"
											: ""
									} font-normal`}
								>
									{day}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{dutyData.duty.map((member) => (
							<tr key={member.memberId} className="border-b border-gray-100">
								<td
									className={`pl-2 pr-2 py-2 font-medium sticky left-0 bg-white z-10 text-center ${
										member.name.length > 3 ? "text-xs" : "text-sm"
									}`}
								>
									<div className="bg-gray-50 rounded-lg px-2 py-0.5">
										{member.name}
									</div>
								</td>
								{member.shifts.split("").map((shift, index) => (
									<td key={index} className="px-2 py-1.5 text-center">
										<DutyBadgeEng
											type={
												(shift === "X" ? "default" : shift) as
													| "D"
													| "E"
													| "N"
													| "O"
													| "default"
											}
											variant="letter"
											size="sm"
										/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isReqModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
					onClick={() => setIsReqModalOpen(false)}
				>
					<div onClick={(e) => e.stopPropagation()}>
						<ReqShiftModal onClose={() => setIsReqModalOpen(false)} />
					</div>
				</div>
			)}
		</div>
	);
};

export default TeamShiftTable;
